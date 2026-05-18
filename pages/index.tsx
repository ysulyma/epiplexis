import { promises as fsp } from "node:fs";

import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useId, useState } from "react";

import { ExternalLink } from "@/components/ExternalLink.tsx";
import { cn } from "@/lib/utils.ts";

type Dir = {
  name: string;
  children: (string | Dir)[];
};

export const getStaticProps = (async () => {
  const appDir = await buildTree("./app");
  const pagesDir = await buildTree("./pages");

  const dir = mergeDirs(appDir, pagesDir);

  return {
    props: { dir },
  };
}) satisfies GetStaticProps<{
  dir: Dir;
}>;

export default function Page({
  dir,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main className="p-4 text-2xl leading-normal">
      This is the content repository for{" "}
      <ExternalLink href="https://epiplexis.xyz/">Epiplexis</ExternalLink>. You
      can clone the repository from{" "}
      <ExternalLink href="https://github.com/ysulyma/epiplexis-next">
        <img
          alt=""
          className="mr-1 inline h-6 w-6"
          src={`${process.env.NEXT_PUBLIC_ROOT}/github.svg`}
        />
        GitHub
      </ExternalLink>
      .
      {/* <pre>
        {JSON.stringify(dir, null, 2)}
      </pre> */}
      <h1 className="my-2 text-3xl">Content</h1>
      {/** biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: lists are ok */}
      <ul aria-label="Interactives" className="font-mono" role="tree">
        {dir.children.map((item) =>
          typeof item === "string" ? null : <Tree dir={item} key={item.name} />,
        )}
      </ul>
    </main>
  );
}

function Tree({ dir }: { dir: Dir }) {
  const [expanded, setExpanded] = useState(true);
  const id = useId();

  return (
    <div className="group" role="none">
      <span
        aria-expanded={expanded}
        aria-owns={id}
        className="cursor-pointer"
        onClick={() => setExpanded((prev) => !prev)}
        role="treeitem"
        tabIndex={0}
      >
        {formatPagesPath(dir.name) + "/"}
      </span>
      {dir.children.length > 0 && (
        <ul className={cn("ml-8 list-none", expanded || "hidden")} id={id}>
          {dir.children.map((item) => {
            if (typeof item === "string") {
              const isAppDir = item.startsWith("./app");
              if (isAppDir && !item.endsWith("page.tsx")) return null;

              return (
                <li key={item} role="none">
                  <Link
                    className="text-blue-600"
                    href={isAppDir ? appHref(item) : pagesHref(item)}
                    role="treeitem"
                    tabIndex={0}
                  >
                    {isAppDir ? formatAppPath(item) : formatPagesPath(item)}
                  </Link>
                </li>
              );
            } else {
              return <Tree dir={item} key={item.name} />;
            }
          })}
        </ul>
      )}
    </div>
  );
}

async function buildTree(dirname: string): Promise<Dir> {
  const files = await fsp.readdir(dirname);
  const dir: Dir = {
    children: [],
    name: dirname,
  };

  for (const file of files) {
    if (shouldSkipFile(file)) continue;
    const filename = `${dirname}/${file}`;

    const stat = await fsp.stat(filename);

    if (stat.isDirectory()) {
      dir.children.push(await buildTree(filename));
    } else {
      dir.children.push(filename);
    }
  }

  return dir;
}

function shouldSkipFile(basename: string) {
  return basename === ".DS_Store";
}

function formatAppPath(path: string) {
  return pagesHref(path).split("/").at(-2)!;
}

function formatPagesPath(path: string) {
  return pagesHref(path).split("/").at(-1)!;
}

function appHref(path: string) {
  return path.replace(/^\.\/app/, "").replace(/page\.tsx$/, "");
}

function pagesHref(path: string) {
  return path.replace(/^\.\/pages/, "").replace(/\.tsx$/, "");
}

function mergeDirs(appDir: Dir, pagesDir: Dir): Dir {
  // @todo this is horrible
  const aChildren = dirToMap(appDir);
  const bChildren = dirToMap(pagesDir);

  const c: Dir = { children: [], name: normalize(appDir.name) };

  for (const [key, value] of aChildren.entries()) {
    if (typeof value === "string") {
      c.children.push(value);
    } else {
      if (bChildren.has(key)) {
        c.children.push(mergeDirs(value, bChildren.get(key) as Dir));
      } else {
        const page = value.children.find(
          (child) => typeof child === "string" && child.endsWith("page.tsx"),
        );
        if (page) {
          c.children.push(page);
        } else {
          c.children.push(value);
        }
      }
    }
    bChildren.delete(key);
  }

  for (const value of bChildren.values()) {
    if (typeof value === "string") {
      c.children.push(value);
    } else {
      c.children.push({ ...value, name: normalize(value.name) });
    }
  }

  c.children.sort((a, b) => {
    const keyA = typeof a === "string" ? a : normalize(a.name);
    const keyB = typeof b === "string" ? b : normalize(b.name);
    return keyA.localeCompare(keyB);
  });

  return c;
}

function dirToMap(dir: Dir) {
  return new Map(
    dir.children.map((child): [string, string | Dir] => {
      if (typeof child === "string") {
        return [normalize(child), normalize(child)];
      }
      return [normalize(child.name), child];
    }),
  );
}

function normalize(path: string) {
  return path.replace(/^\.\/(app|pages)/, ".");
}

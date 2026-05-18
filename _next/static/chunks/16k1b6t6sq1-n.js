(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,8155,e=>{"use strict";let t=e=>{let t,n=new Set,i=(e,i)=>{let r="function"==typeof e?e(t):e;if(!Object.is(r,t)){let e=t;t=(null!=i?i:"object"!=typeof r||null===r)?r:Object.assign({},t,r),n.forEach(n=>n(t,e))}},r=()=>t,o={setState:i,getState:r,getInitialState:()=>a,subscribe:e=>(n.add(e),()=>n.delete(e))},a=t=e(i,r,o);return o};e.s(["createStore",0,e=>e?t(e):t])},99347,e=>{"use strict";function t(e){}e.i(71645),"u">typeof window&&window.matchMedia?.("(any-hover: hover)")?.matches,e.s(["combineRefs",0,function(...e){return t=>{for(let n of e)"function"==typeof n?n(t):null===n||void 0===n||"object"==typeof n&&Object.hasOwn(n,"current")&&(n.current=t)}},"onDragReact",0,function(e,n,i){let r=function(e,n=()=>{},i=()=>{}){return r=>{if(r instanceof MouseEvent){if(0!==r.button)return;let o=r.clientX,a=r.clientY,s=e=>{t(e);let n=e.clientX-o,r=e.clientY-a;return document.body.removeEventListener("mousemove",l),window.removeEventListener("mouseup",s),i(e,{dx:n,dy:r,x:e.clientX,y:e.clientY})},l=n=>{t(n);let i=n.clientX-o,r=n.clientY-a;return o=n.clientX,a=n.clientY,e(n,{dx:i,dy:r,x:n.clientX,y:n.clientY})};return document.body.addEventListener("mousemove",l,{passive:!1}),window.addEventListener("mouseup",s,{passive:!1}),n(r,{x:r.clientX,y:r.clientY},s,l)}{r.preventDefault();let o=r.changedTouches,a=o[0].identifier,s=o[0].clientX,l=o[0].clientY,c=e=>{for(let n of(t(e),e.preventDefault(),Array.from(e.changedTouches))){if(n.identifier!==a)continue;let t=n.clientX-s,r=n.clientY-l;return window.removeEventListener("touchend",c,{capture:!1,passive:!1}),window.removeEventListener("touchcancel",c,{capture:!1,passive:!1}),window.removeEventListener("touchmove",d,{capture:!1,passive:!1}),i(e,{dx:t,dy:r,x:n.clientX,y:n.clientY})}},d=n=>{for(let i of(t(n),n.preventDefault(),Array.from(n.changedTouches))){if(i.identifier!==a)continue;let t=i.clientX-s,r=i.clientY-l;return s=i.clientX,l=i.clientY,e(n,{dx:t,dy:r,x:i.clientX,y:i.clientY})}};return window.addEventListener("touchend",c,{capture:!1,passive:!1}),window.addEventListener("touchcancel",c,{capture:!1,passive:!1}),window.addEventListener("touchmove",d,{capture:!1,passive:!1}),n(r,{x:o[0].clientX,y:o[0].clientY},c,d)}}}(e,n,i);return{"data-affords":"click",onMouseDown:e=>r(e.nativeEvent),onTouchStart:e=>r(e.nativeEvent)}}],99347)},75630,16038,e=>{"use strict";var t=e.i(932),n=e.i(28600),i=e.i(71645);let r=(0,i.createContext)(null);function o(e,t=2){return Object.values(e).map(e=>Number.parseFloat(e.toFixed(t)))}e.s(["ControlsContext",0,r,"PositionHelper",0,function(){let e,a,s=(0,t.c)(4),{camera:l}=(0,n.useThree)(),c=(0,i.useContext)(r);return s[0]!==l||s[1]!==c?(e=()=>{let e=e=>{!c||e.getModifierState("Shift")&&(console.log(o(l.position)),console.log(o(c.target)))};return document.body.addEventListener("click",e),()=>{document.body.removeEventListener("click",e)}},a=[l,c],s[0]=l,s[1]=c,s[2]=e,s[3]=a):(e=s[2],a=s[3]),(0,i.useEffect)(e,a),null}],75630),e.s(["lerp",0,function(e,t,n){return e+n*(t-e)},"truncate",0,function(e,t=0){return Number.parseFloat(e.toFixed(t))}],16038)},91333,e=>{"use strict";var t=e.i(43476),n=e.i(932),i=e.i(16400),r=e.i(71645),o=e.i(99347);let a=(0,r.forwardRef)(function(e,a){let s,l,c,d,u,f,p,m,h=(0,n.c)(15);h[0]!==e?({className:l,children:s,display:d,...c}=e,h[0]=e,h[1]=s,h[2]=l,h[3]=c,h[4]=d):(s=h[1],l=h[2],c=h[3],d=h[4]);let v=void 0!==d&&d,y=(0,r.useRef)(null);return h[5]!==s||h[6]!==v?(u=()=>{y.current&&i.default.render(s??"",y.current,{displayMode:v,throwOnError:!1})},f=[s,v],h[5]=s,h[6]=v,h[7]=u,h[8]=f):(u=h[7],f=h[8]),(0,r.useEffect)(u,f),h[9]!==a?(p=(0,o.combineRefs)(y,a),h[9]=a,h[10]=p):p=h[10],h[11]!==l||h[12]!==c||h[13]!==p?(m=(0,t.jsx)("span",{className:l,ref:p,...c}),h[11]=l,h[12]=c,h[13]=p,h[14]=m):m=h[14],m});e.s(["KTX",0,a])},96205,e=>{"use strict";let t,n;var i=e.i(43476),r=e.i(932),o=e.i(30297),a=e.i(75056),s=e.i(71645),l=e.i(75630),c=e.i(91333),d=e.i(26399),u=e.i(16038);let f=new d.Signal(0),{raw:p}=String;function m(){let e,t,n,o,a,s,l=(0,r.c)(11),m=(0,d.useSignalValue)(f);l[0]===Symbol.for("react.memo_cache_sentinel")?(e={max:1,min:-1,onChange:h},l[0]=e):e=l[0];let v=e;return l[1]===Symbol.for("react.memo_cache_sentinel")?(t=(0,i.jsxs)("p",{children:["Adjust the slider to see different cross-sections (implicit curves) of the implicit surface",(0,i.jsx)(c.KTX,{display:!0,children:p`
        2y(y^{2}-3x^{2})(1-z^{2})+(x^{2}+y^{2})^{2}-(9z^{2}-1)(1-z^{2})=0.
        `})]}),l[1]=t):t=l[1],l[2]!==m?(n=(0,i.jsx)("input",{step:"any",type:"range",...v,value:m}),l[2]=m,l[3]=n):n=l[3],l[4]!==m?(o=(0,u.truncate)(m,2),l[4]=m,l[5]=o):o=l[5],l[6]!==o?(a=(0,i.jsx)("input",{className:"w-20 appearance-none bg-[#0001] text-right dark:bg-[#fff3]",step:"0.05",type:"number",value:o,...v}),l[6]=o,l[7]=a):a=l[7],l[8]!==n||l[9]!==a?(s=(0,i.jsxs)("form",{className:"w-full text-center",children:[t,(0,i.jsxs)("div",{className:"mx-auto my-4 flex w-max items-center gap-4 text-2xl",children:[n,a]})]}),l[8]=n,l[9]=a,l[10]=s):s=l[10],s}function h(e){let t=Number.parseFloat(e.currentTarget.value);Number.isNaN(t)||f.set(t)}var v=e.i(32009),y=v;let g=parseInt(v.REVISION.replace(/\D+/g,""));class x extends y.ShaderMaterial{constructor(e){super({type:"LineMaterial",uniforms:y.UniformsUtils.clone(y.UniformsUtils.merge([y.UniformsLib.common,y.UniformsLib.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new y.Vector2(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${g>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}var b=v,S=v;let w=new S.Box3,_=new S.Vector3;class E extends S.InstancedBufferGeometry{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new S.Float32BufferAttribute([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new S.Float32BufferAttribute([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new S.InstancedInterleavedBuffer(t,6,1);return this.setAttribute("instanceStart",new S.InterleavedBufferAttribute(n,3,0)),this.setAttribute("instanceEnd",new S.InterleavedBufferAttribute(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));let i=new S.InstancedInterleavedBuffer(n,2*t,1);return this.setAttribute("instanceColorStart",new S.InterleavedBufferAttribute(i,t,0)),this.setAttribute("instanceColorEnd",new S.InterleavedBufferAttribute(i,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new S.WireframeGeometry(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new S.Box3);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),w.setFromBufferAttribute(t),this.boundingBox.union(w))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new S.Sphere),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)_.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(_)),_.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(_));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}let A=g>=125?"uv1":"uv2",L=new b.Vector4,U=new b.Vector3,z=new b.Vector3,O=new b.Vector4,B=new b.Vector4,M=new b.Vector4,j=new b.Vector3,C=new b.Matrix4,D=new b.Line3,T=new b.Vector3,I=new b.Box3,P=new b.Sphere,R=new b.Vector4;function N(e,t,i){return R.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),R.multiplyScalar(1/R.w),R.x=n/i.width,R.y=n/i.height,R.applyMatrix4(e.projectionMatrixInverse),R.multiplyScalar(1/R.w),Math.abs(Math.max(R.x,R.y))}class V extends b.Mesh{constructor(e=new E,t=new x({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let e=0,r=0,o=t.count;e<o;e++,r+=2)U.fromBufferAttribute(t,e),z.fromBufferAttribute(n,e),i[r]=0===r?0:i[r-1],i[r+1]=i[r]+U.distanceTo(z);let r=new b.InstancedInterleavedBuffer(i,2,1);return e.setAttribute("instanceDistanceStart",new b.InterleavedBufferAttribute(r,1,0)),e.setAttribute("instanceDistanceEnd",new b.InterleavedBufferAttribute(r,1,1)),this}raycast(e,i){let r,o,a=this.material.worldUnits,s=e.camera;null!==s||a||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let l=void 0!==e.params.Line2&&e.params.Line2.threshold||0;t=e.ray;let c=this.matrixWorld,d=this.geometry,u=this.material;if(n=u.linewidth+l,null===d.boundingSphere&&d.computeBoundingSphere(),P.copy(d.boundingSphere).applyMatrix4(c),a)r=.5*n;else{let e=Math.max(s.near,P.distanceToPoint(t.origin));r=N(s,e,u.resolution)}if(P.radius+=r,!1!==t.intersectsSphere(P)){if(null===d.boundingBox&&d.computeBoundingBox(),I.copy(d.boundingBox).applyMatrix4(c),a)o=.5*n;else{let e=Math.max(s.near,I.distanceToPoint(t.origin));o=N(s,e,u.resolution)}I.expandByScalar(o),!1!==t.intersectsBox(I)&&(a?function(e,i){let r=e.matrixWorld,o=e.geometry,a=o.attributes.instanceStart,s=o.attributes.instanceEnd,l=Math.min(o.instanceCount,a.count);for(let o=0;o<l;o++){D.start.fromBufferAttribute(a,o),D.end.fromBufferAttribute(s,o),D.applyMatrix4(r);let l=new b.Vector3,c=new b.Vector3;t.distanceSqToSegment(D.start,D.end,c,l),c.distanceTo(l)<.5*n&&i.push({point:c,pointOnLine:l,distance:t.origin.distanceTo(c),object:e,face:null,faceIndex:o,uv:null,[A]:null})}}(this,i):function(e,i,r){let o=i.projectionMatrix,a=e.material.resolution,s=e.matrixWorld,l=e.geometry,c=l.attributes.instanceStart,d=l.attributes.instanceEnd,u=Math.min(l.instanceCount,c.count),f=-i.near;t.at(1,M),M.w=1,M.applyMatrix4(i.matrixWorldInverse),M.applyMatrix4(o),M.multiplyScalar(1/M.w),M.x*=a.x/2,M.y*=a.y/2,M.z=0,j.copy(M),C.multiplyMatrices(i.matrixWorldInverse,s);for(let i=0;i<u;i++){if(O.fromBufferAttribute(c,i),B.fromBufferAttribute(d,i),O.w=1,B.w=1,O.applyMatrix4(C),B.applyMatrix4(C),O.z>f&&B.z>f)continue;if(O.z>f){let e=O.z-B.z,t=(O.z-f)/e;O.lerp(B,t)}else if(B.z>f){let e=B.z-O.z,t=(B.z-f)/e;B.lerp(O,t)}O.applyMatrix4(o),B.applyMatrix4(o),O.multiplyScalar(1/O.w),B.multiplyScalar(1/B.w),O.x*=a.x/2,O.y*=a.y/2,B.x*=a.x/2,B.y*=a.y/2,D.start.copy(O),D.start.z=0,D.end.copy(B),D.end.z=0;let l=D.closestPointToPointParameter(j,!0);D.at(l,T);let u=b.MathUtils.lerp(O.z,B.z,l),p=u>=-1&&u<=1,m=j.distanceTo(T)<.5*n;if(p&&m){D.start.fromBufferAttribute(c,i),D.end.fromBufferAttribute(d,i),D.start.applyMatrix4(s),D.end.applyMatrix4(s);let n=new b.Vector3,o=new b.Vector3;t.distanceSqToSegment(D.start,D.end,o,n),r.push({point:o,pointOnLine:n,distance:t.origin.distanceTo(o),object:e,face:null,faceIndex:i,uv:null,[A]:null})}}}(this,s,i))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(L),this.material.uniforms.resolution.value.set(L.z,L.w))}}let H=new Int32Array([0,265,515,778,1030,1295,1541,1804,2060,2309,2575,2822,3082,3331,3593,3840,400,153,915,666,1430,1183,1941,1692,2460,2197,2975,2710,3482,3219,3993,3728,560,825,51,314,1590,1855,1077,1340,2620,2869,2111,2358,3642,3891,3129,3376,928,681,419,170,1958,1711,1445,1196,2988,2725,2479,2214,4010,3747,3497,3232,1120,1385,1635,1898,102,367,613,876,3180,3429,3695,3942,2154,2403,2665,2912,1520,1273,2035,1786,502,255,1013,764,3580,3317,4095,3830,2554,2291,3065,2800,1616,1881,1107,1370,598,863,85,348,3676,3925,3167,3414,2650,2899,2137,2384,1984,1737,1475,1226,966,719,453,204,4044,3781,3535,3270,3018,2755,2505,2240,2240,2505,2755,3018,3270,3535,3781,4044,204,453,719,966,1226,1475,1737,1984,2384,2137,2899,2650,3414,3167,3925,3676,348,85,863,598,1370,1107,1881,1616,2800,3065,2291,2554,3830,4095,3317,3580,764,1013,255,502,1786,2035,1273,1520,2912,2665,2403,2154,3942,3695,3429,3180,876,613,367,102,1898,1635,1385,1120,3232,3497,3747,4010,2214,2479,2725,2988,1196,1445,1711,1958,170,419,681,928,3376,3129,3891,3642,2358,2111,2869,2620,1340,1077,1855,1590,314,51,825,560,3728,3993,3219,3482,2710,2975,2197,2460,1692,1941,1183,1430,666,915,153,400,3840,3593,3331,3082,2822,2575,2309,2060,1804,1541,1295,1030,778,515,265,0]),F=new Int32Array([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,9,8,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,2,10,0,2,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,8,3,2,10,8,10,9,8,-1,-1,-1,-1,-1,-1,-1,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,8,11,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,11,2,1,9,11,9,8,11,-1,-1,-1,-1,-1,-1,-1,3,10,1,11,10,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,10,1,0,8,10,8,11,10,-1,-1,-1,-1,-1,-1,-1,3,9,0,3,11,9,11,10,9,-1,-1,-1,-1,-1,-1,-1,9,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,7,3,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,1,9,4,7,1,7,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,4,7,3,0,4,1,2,10,-1,-1,-1,-1,-1,-1,-1,9,2,10,9,0,2,8,4,7,-1,-1,-1,-1,-1,-1,-1,2,10,9,2,9,7,2,7,3,7,9,4,-1,-1,-1,-1,8,4,7,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,4,7,11,2,4,2,0,4,-1,-1,-1,-1,-1,-1,-1,9,0,1,8,4,7,2,3,11,-1,-1,-1,-1,-1,-1,-1,4,7,11,9,4,11,9,11,2,9,2,1,-1,-1,-1,-1,3,10,1,3,11,10,7,8,4,-1,-1,-1,-1,-1,-1,-1,1,11,10,1,4,11,1,0,4,7,11,4,-1,-1,-1,-1,4,7,8,9,0,11,9,11,10,11,0,3,-1,-1,-1,-1,4,7,11,4,11,9,9,11,10,-1,-1,-1,-1,-1,-1,-1,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,5,4,1,5,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,5,4,8,3,5,3,1,5,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,10,4,9,5,-1,-1,-1,-1,-1,-1,-1,5,2,10,5,4,2,4,0,2,-1,-1,-1,-1,-1,-1,-1,2,10,5,3,2,5,3,5,4,3,4,8,-1,-1,-1,-1,9,5,4,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,0,8,11,4,9,5,-1,-1,-1,-1,-1,-1,-1,0,5,4,0,1,5,2,3,11,-1,-1,-1,-1,-1,-1,-1,2,1,5,2,5,8,2,8,11,4,8,5,-1,-1,-1,-1,10,3,11,10,1,3,9,5,4,-1,-1,-1,-1,-1,-1,-1,4,9,5,0,8,1,8,10,1,8,11,10,-1,-1,-1,-1,5,4,0,5,0,11,5,11,10,11,0,3,-1,-1,-1,-1,5,4,8,5,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,9,7,8,5,7,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,3,0,9,5,3,5,7,3,-1,-1,-1,-1,-1,-1,-1,0,7,8,0,1,7,1,5,7,-1,-1,-1,-1,-1,-1,-1,1,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,7,8,9,5,7,10,1,2,-1,-1,-1,-1,-1,-1,-1,10,1,2,9,5,0,5,3,0,5,7,3,-1,-1,-1,-1,8,0,2,8,2,5,8,5,7,10,5,2,-1,-1,-1,-1,2,10,5,2,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,7,9,5,7,8,9,3,11,2,-1,-1,-1,-1,-1,-1,-1,9,5,7,9,7,2,9,2,0,2,7,11,-1,-1,-1,-1,2,3,11,0,1,8,1,7,8,1,5,7,-1,-1,-1,-1,11,2,1,11,1,7,7,1,5,-1,-1,-1,-1,-1,-1,-1,9,5,8,8,5,7,10,1,3,10,3,11,-1,-1,-1,-1,5,7,0,5,0,9,7,11,0,1,0,10,11,10,0,-1,11,10,0,11,0,3,10,5,0,8,0,7,5,7,0,-1,11,10,5,7,11,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,0,1,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,1,9,8,5,10,6,-1,-1,-1,-1,-1,-1,-1,1,6,5,2,6,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,6,5,1,2,6,3,0,8,-1,-1,-1,-1,-1,-1,-1,9,6,5,9,0,6,0,2,6,-1,-1,-1,-1,-1,-1,-1,5,9,8,5,8,2,5,2,6,3,2,8,-1,-1,-1,-1,2,3,11,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,0,8,11,2,0,10,6,5,-1,-1,-1,-1,-1,-1,-1,0,1,9,2,3,11,5,10,6,-1,-1,-1,-1,-1,-1,-1,5,10,6,1,9,2,9,11,2,9,8,11,-1,-1,-1,-1,6,3,11,6,5,3,5,1,3,-1,-1,-1,-1,-1,-1,-1,0,8,11,0,11,5,0,5,1,5,11,6,-1,-1,-1,-1,3,11,6,0,3,6,0,6,5,0,5,9,-1,-1,-1,-1,6,5,9,6,9,11,11,9,8,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,4,7,3,6,5,10,-1,-1,-1,-1,-1,-1,-1,1,9,0,5,10,6,8,4,7,-1,-1,-1,-1,-1,-1,-1,10,6,5,1,9,7,1,7,3,7,9,4,-1,-1,-1,-1,6,1,2,6,5,1,4,7,8,-1,-1,-1,-1,-1,-1,-1,1,2,5,5,2,6,3,0,4,3,4,7,-1,-1,-1,-1,8,4,7,9,0,5,0,6,5,0,2,6,-1,-1,-1,-1,7,3,9,7,9,4,3,2,9,5,9,6,2,6,9,-1,3,11,2,7,8,4,10,6,5,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,2,4,2,0,2,7,11,-1,-1,-1,-1,0,1,9,4,7,8,2,3,11,5,10,6,-1,-1,-1,-1,9,2,1,9,11,2,9,4,11,7,11,4,5,10,6,-1,8,4,7,3,11,5,3,5,1,5,11,6,-1,-1,-1,-1,5,1,11,5,11,6,1,0,11,7,11,4,0,4,11,-1,0,5,9,0,6,5,0,3,6,11,6,3,8,4,7,-1,6,5,9,6,9,11,4,7,9,7,11,9,-1,-1,-1,-1,10,4,9,6,4,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,10,6,4,9,10,0,8,3,-1,-1,-1,-1,-1,-1,-1,10,0,1,10,6,0,6,4,0,-1,-1,-1,-1,-1,-1,-1,8,3,1,8,1,6,8,6,4,6,1,10,-1,-1,-1,-1,1,4,9,1,2,4,2,6,4,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,9,2,4,9,2,6,4,-1,-1,-1,-1,0,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,3,2,8,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,10,4,9,10,6,4,11,2,3,-1,-1,-1,-1,-1,-1,-1,0,8,2,2,8,11,4,9,10,4,10,6,-1,-1,-1,-1,3,11,2,0,1,6,0,6,4,6,1,10,-1,-1,-1,-1,6,4,1,6,1,10,4,8,1,2,1,11,8,11,1,-1,9,6,4,9,3,6,9,1,3,11,6,3,-1,-1,-1,-1,8,11,1,8,1,0,11,6,1,9,1,4,6,4,1,-1,3,11,6,3,6,0,0,6,4,-1,-1,-1,-1,-1,-1,-1,6,4,8,11,6,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,10,6,7,8,10,8,9,10,-1,-1,-1,-1,-1,-1,-1,0,7,3,0,10,7,0,9,10,6,7,10,-1,-1,-1,-1,10,6,7,1,10,7,1,7,8,1,8,0,-1,-1,-1,-1,10,6,7,10,7,1,1,7,3,-1,-1,-1,-1,-1,-1,-1,1,2,6,1,6,8,1,8,9,8,6,7,-1,-1,-1,-1,2,6,9,2,9,1,6,7,9,0,9,3,7,3,9,-1,7,8,0,7,0,6,6,0,2,-1,-1,-1,-1,-1,-1,-1,7,3,2,6,7,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,11,10,6,8,10,8,9,8,6,7,-1,-1,-1,-1,2,0,7,2,7,11,0,9,7,6,7,10,9,10,7,-1,1,8,0,1,7,8,1,10,7,6,7,10,2,3,11,-1,11,2,1,11,1,7,10,6,1,6,7,1,-1,-1,-1,-1,8,9,6,8,6,7,9,1,6,11,6,3,1,3,6,-1,0,9,1,11,6,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,8,0,7,0,6,3,11,0,11,6,0,-1,-1,-1,-1,7,11,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,1,9,8,3,1,11,7,6,-1,-1,-1,-1,-1,-1,-1,10,1,2,6,11,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,3,0,8,6,11,7,-1,-1,-1,-1,-1,-1,-1,2,9,0,2,10,9,6,11,7,-1,-1,-1,-1,-1,-1,-1,6,11,7,2,10,3,10,8,3,10,9,8,-1,-1,-1,-1,7,2,3,6,2,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,0,8,7,6,0,6,2,0,-1,-1,-1,-1,-1,-1,-1,2,7,6,2,3,7,0,1,9,-1,-1,-1,-1,-1,-1,-1,1,6,2,1,8,6,1,9,8,8,7,6,-1,-1,-1,-1,10,7,6,10,1,7,1,3,7,-1,-1,-1,-1,-1,-1,-1,10,7,6,1,7,10,1,8,7,1,0,8,-1,-1,-1,-1,0,3,7,0,7,10,0,10,9,6,10,7,-1,-1,-1,-1,7,6,10,7,10,8,8,10,9,-1,-1,-1,-1,-1,-1,-1,6,8,4,11,8,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,6,11,3,0,6,0,4,6,-1,-1,-1,-1,-1,-1,-1,8,6,11,8,4,6,9,0,1,-1,-1,-1,-1,-1,-1,-1,9,4,6,9,6,3,9,3,1,11,3,6,-1,-1,-1,-1,6,8,4,6,11,8,2,10,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,3,0,11,0,6,11,0,4,6,-1,-1,-1,-1,4,11,8,4,6,11,0,2,9,2,10,9,-1,-1,-1,-1,10,9,3,10,3,2,9,4,3,11,3,6,4,6,3,-1,8,2,3,8,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,0,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,4,2,4,6,4,3,8,-1,-1,-1,-1,1,9,4,1,4,2,2,4,6,-1,-1,-1,-1,-1,-1,-1,8,1,3,8,6,1,8,4,6,6,10,1,-1,-1,-1,-1,10,1,0,10,0,6,6,0,4,-1,-1,-1,-1,-1,-1,-1,4,6,3,4,3,8,6,10,3,0,3,9,10,9,3,-1,10,9,4,6,10,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,5,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,5,11,7,6,-1,-1,-1,-1,-1,-1,-1,5,0,1,5,4,0,7,6,11,-1,-1,-1,-1,-1,-1,-1,11,7,6,8,3,4,3,5,4,3,1,5,-1,-1,-1,-1,9,5,4,10,1,2,7,6,11,-1,-1,-1,-1,-1,-1,-1,6,11,7,1,2,10,0,8,3,4,9,5,-1,-1,-1,-1,7,6,11,5,4,10,4,2,10,4,0,2,-1,-1,-1,-1,3,4,8,3,5,4,3,2,5,10,5,2,11,7,6,-1,7,2,3,7,6,2,5,4,9,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,6,0,6,2,6,8,7,-1,-1,-1,-1,3,6,2,3,7,6,1,5,0,5,4,0,-1,-1,-1,-1,6,2,8,6,8,7,2,1,8,4,8,5,1,5,8,-1,9,5,4,10,1,6,1,7,6,1,3,7,-1,-1,-1,-1,1,6,10,1,7,6,1,0,7,8,7,0,9,5,4,-1,4,0,10,4,10,5,0,3,10,6,10,7,3,7,10,-1,7,6,10,7,10,8,5,4,10,4,8,10,-1,-1,-1,-1,6,9,5,6,11,9,11,8,9,-1,-1,-1,-1,-1,-1,-1,3,6,11,0,6,3,0,5,6,0,9,5,-1,-1,-1,-1,0,11,8,0,5,11,0,1,5,5,6,11,-1,-1,-1,-1,6,11,3,6,3,5,5,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,11,9,11,8,11,5,6,-1,-1,-1,-1,0,11,3,0,6,11,0,9,6,5,6,9,1,2,10,-1,11,8,5,11,5,6,8,0,5,10,5,2,0,2,5,-1,6,11,3,6,3,5,2,10,3,10,5,3,-1,-1,-1,-1,5,8,9,5,2,8,5,6,2,3,8,2,-1,-1,-1,-1,9,5,6,9,6,0,0,6,2,-1,-1,-1,-1,-1,-1,-1,1,5,8,1,8,0,5,6,8,3,8,2,6,2,8,-1,1,5,6,2,1,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,3,6,1,6,10,3,8,6,5,6,9,8,9,6,-1,10,1,0,10,0,6,9,5,0,5,6,0,-1,-1,-1,-1,0,3,8,5,6,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,5,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,7,5,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,11,7,5,8,3,0,-1,-1,-1,-1,-1,-1,-1,5,11,7,5,10,11,1,9,0,-1,-1,-1,-1,-1,-1,-1,10,7,5,10,11,7,9,8,1,8,3,1,-1,-1,-1,-1,11,1,2,11,7,1,7,5,1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,7,1,7,5,7,2,11,-1,-1,-1,-1,9,7,5,9,2,7,9,0,2,2,11,7,-1,-1,-1,-1,7,5,2,7,2,11,5,9,2,3,2,8,9,8,2,-1,2,5,10,2,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1,8,2,0,8,5,2,8,7,5,10,2,5,-1,-1,-1,-1,9,0,1,5,10,3,5,3,7,3,10,2,-1,-1,-1,-1,9,8,2,9,2,1,8,7,2,10,2,5,7,5,2,-1,1,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,7,0,7,1,1,7,5,-1,-1,-1,-1,-1,-1,-1,9,0,3,9,3,5,5,3,7,-1,-1,-1,-1,-1,-1,-1,9,8,7,5,9,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,5,8,4,5,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,5,0,4,5,11,0,5,10,11,11,3,0,-1,-1,-1,-1,0,1,9,8,4,10,8,10,11,10,4,5,-1,-1,-1,-1,10,11,4,10,4,5,11,3,4,9,4,1,3,1,4,-1,2,5,1,2,8,5,2,11,8,4,5,8,-1,-1,-1,-1,0,4,11,0,11,3,4,5,11,2,11,1,5,1,11,-1,0,2,5,0,5,9,2,11,5,4,5,8,11,8,5,-1,9,4,5,2,11,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,5,10,3,5,2,3,4,5,3,8,4,-1,-1,-1,-1,5,10,2,5,2,4,4,2,0,-1,-1,-1,-1,-1,-1,-1,3,10,2,3,5,10,3,8,5,4,5,8,0,1,9,-1,5,10,2,5,2,4,1,9,2,9,4,2,-1,-1,-1,-1,8,4,5,8,5,3,3,5,1,-1,-1,-1,-1,-1,-1,-1,0,4,5,1,0,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,4,5,8,5,3,9,0,5,0,3,5,-1,-1,-1,-1,9,4,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,11,7,4,9,11,9,10,11,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,7,9,11,7,9,10,11,-1,-1,-1,-1,1,10,11,1,11,4,1,4,0,7,4,11,-1,-1,-1,-1,3,1,4,3,4,8,1,10,4,7,4,11,10,11,4,-1,4,11,7,9,11,4,9,2,11,9,1,2,-1,-1,-1,-1,9,7,4,9,11,7,9,1,11,2,11,1,0,8,3,-1,11,7,4,11,4,2,2,4,0,-1,-1,-1,-1,-1,-1,-1,11,7,4,11,4,2,8,3,4,3,2,4,-1,-1,-1,-1,2,9,10,2,7,9,2,3,7,7,4,9,-1,-1,-1,-1,9,10,7,9,7,4,10,2,7,8,7,0,2,0,7,-1,3,7,10,3,10,2,7,4,10,1,10,0,4,0,10,-1,1,10,2,8,7,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,7,1,3,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,0,8,1,8,7,1,-1,-1,-1,-1,4,0,3,7,4,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,8,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,11,9,10,-1,-1,-1,-1,-1,-1,-1,0,1,10,0,10,8,8,10,11,-1,-1,-1,-1,-1,-1,-1,3,1,10,11,3,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,11,1,11,9,9,11,8,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,1,2,9,2,11,9,-1,-1,-1,-1,0,2,11,8,0,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,2,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,10,8,9,-1,-1,-1,-1,-1,-1,-1,9,10,2,0,9,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,0,1,8,1,10,8,-1,-1,-1,-1,1,10,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,3,8,9,1,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,9,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,3,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]),W=(e,t,n)=>2*t*(t**2-3*e**2)*(1-n**2)+(e**2+t**2)**2-(9*n**2-1)*(1-n**2);function G(){let e,t,n,o,a=(0,r.c)(6);a[0]===Symbol.for("react.memo_cache_sentinel")?(e=function(e){let t=[],n=[];for(let i=0;i<64;i++)for(let r=0;r<64;r++)for(let o=0;o<64;o++){let a=-2+4*o/63,s=-2+4*r/63,l=-2+4*i/63;t.push(new v.Vector3(a,s,l));let c=e(a,s,l);n.push(c)}let i=Array(12),r=[],o=new v.BufferGeometry;for(let e=0;e<63;e++)for(let o=0;o<63;o++)for(let a=0;a<63;a++){let s=a+64*o+4096*e,l=s+1,c=s+64,d=c+1,u=s+4096,f=l+4096,p=c+4096,m=d+4096,h=n[s],v=n[l],y=n[c],g=n[d],x=n[u],b=n[f],S=n[p],w=n[m],_=0;h<0&&(_|=1),v<0&&(_|=2),y<0&&(_|=8),g<0&&(_|=4),x<0&&(_|=16),b<0&&(_|=32),S<0&&(_|=128),w<0&&(_|=64);let E=H[_];if(0===E)continue;let A=.5;1&E&&(A=(0-h)/(v-h),i[0]=t[s].clone().lerp(t[l],A)),2&E&&(A=(0-v)/(g-v),i[1]=t[l].clone().lerp(t[d],A)),4&E&&(A=(0-y)/(g-y),i[2]=t[c].clone().lerp(t[d],A)),8&E&&(A=(0-h)/(y-h),i[3]=t[s].clone().lerp(t[c],A)),16&E&&(A=(0-x)/(b-x),i[4]=t[u].clone().lerp(t[f],A)),32&E&&(A=(0-b)/(w-b),i[5]=t[f].clone().lerp(t[m],A)),64&E&&(A=(0-S)/(w-S),i[6]=t[p].clone().lerp(t[m],A)),128&E&&(A=(0-x)/(S-x),i[7]=t[u].clone().lerp(t[p],A)),256&E&&(A=(0-h)/(x-h),i[8]=t[s].clone().lerp(t[u],A)),512&E&&(A=(0-v)/(b-v),i[9]=t[l].clone().lerp(t[f],A)),1024&E&&(A=(0-g)/(w-g),i[10]=t[d].clone().lerp(t[m],A)),2048&E&&(A=(0-y)/(S-y),i[11]=t[c].clone().lerp(t[p],A));let L=0;for(_<<=4;-1!==F[_+L];){let e=F[_+L],t=F[_+L+1],n=F[_+L+2];r.push(...i[e].toArray()),r.push(...i[t].toArray()),r.push(...i[n].toArray()),L+=3}}return o.setAttribute("position",new v.BufferAttribute(new Float32Array(r),3)),o.computeVertexNormals(),o}(W),a[0]=e):e=a[0];let s=e,l=(0,d.useSignalValue)(f);if(a[1]!==l){let e=function(e){let t=[];for(let n=-2;n<2;n+=.0625)for(let i=-2;i<2;i+=.0625){let r=e(n,i),o=e(n+.0625,i),a=e(n+.0625,i+.0625),s=e(n,i+.0625),l=0;r>0&&(l+=1),o>0&&(l+=2),a>0&&(l+=4),s>0&&(l+=8);let c=(0-r)/(o-r)*.0625,d=(0-s)/(a-s)*.0625,u=(0-r)/(s-r)*.0625,f=(0-o)/(a-o)*.0625;1===l||14===l?t.push([n,i+u,0],[n+c,i,0]):2===l||13===l?t.push([n+c,i,0],[n+.0625,i+f,0]):4===l||11===l?t.push([n+d,i+.0625,0],[n+.0625,i+f,0]):8===l||7===l?t.push([n,i+u,0],[n+d,i+.0625,0]):3===l||12===l?t.push([n,i+u,0],[n+.0625,i+f,0]):6===l||9===l?t.push([n+c,i,0],[n+d,i+.0625,0]):5===l?t.push([n,i+u,0],[n+c,i,0],[n+d,i+.0625,0],[n+.0625,i+f,0]):10===l?t.push([n+c,i,0],[n+.0625,i+f,0],[n,i+.03125,0],[n,i+u,0],[n+d,i+.0625,0]):(0===l||15===l)&&t.push()}return t}((e,t)=>W(e,t,l));for(let t of e)t[2]=l;let n=new E().setPositions(e.reduce(X,[])),i=new x({color:43571,linewidth:8});i.resolution.set(window.innerWidth,window.innerHeight),t=new V(n,i),a[1]=l,a[2]=t}else t=a[2];let c=t;return a[3]===Symbol.for("react.memo_cache_sentinel")?(n=(0,i.jsx)("mesh",{geometry:s,children:(0,i.jsx)("meshPhysicalMaterial",{color:0xbb00ff,opacity:.7,side:v.DoubleSide,transparent:!0})}),a[3]=n):n=a[3],a[4]!==c?(o=(0,i.jsxs)(i.Fragment,{children:[n,(0,i.jsx)("primitive",{object:c})]}),a[4]=c,a[5]=o):o=a[5],o}function X(e,t){return e.concat(t)}var Y=e.i(32455);function k(){let e,t,n,o,a,l,c,d=(0,r.c)(8),u=(0,s.useRef)(null);d[0]===Symbol.for("react.memo_cache_sentinel")?(e=f.get(),d[0]=e):e=d[0];let p=e;d[1]===Symbol.for("react.memo_cache_sentinel")?(t=()=>f.subscribe(e=>{u.current?.position.setZ(e)}),n=[],d[1]=t,d[2]=n):(t=d[1],n=d[2]),(0,s.useEffect)(t,n),d[3]===Symbol.for("react.memo_cache_sentinel")?(o={dark:0xffffff,light:3355443},d[3]=o):o=d[3];let m=(0,Y.useSchemed)(o);return d[4]===Symbol.for("react.memo_cache_sentinel")?(a=[0,0,p],d[4]=a):a=d[4],d[5]===Symbol.for("react.memo_cache_sentinel")?(l=(0,i.jsx)("planeGeometry",{args:[4,4]}),d[5]=l):l=d[5],d[6]!==m?(c=(0,i.jsxs)("mesh",{position:a,ref:u,renderOrder:1,children:[l,(0,i.jsx)("meshPhongMaterial",{color:m,opacity:.05,side:v.DoubleSide,transparent:!0})]}),d[6]=m,d[7]=c):c=d[7],c}let q=[3.24,-2.63,1.71],K=[0,0,0],J=()=>{let e,t,n,o,a=(0,r.c)(4);return a[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,i.jsx)("gridHelper",{args:[4,4],rotation:[Math.PI/2,0,0]}),t=(0,i.jsx)("axesHelper",{}),n=(0,i.jsx)("ambientLight",{intensity:Math.PI}),a[0]=e,a[1]=t,a[2]=n):(e=a[0],t=a[1],n=a[2]),a[3]===Symbol.for("react.memo_cache_sentinel")?(o=(0,i.jsxs)(i.Fragment,{children:[e,t,n,(0,i.jsx)("pointLight",{decay:0,intensity:Math.PI,position:[5,3,5]}),(0,i.jsx)(G,{}),(0,i.jsx)(k,{})]}),a[3]=o):o=a[3],o};e.s(["default",0,function(){let e,t,n,c,d,u=(0,r.c)(6),[f,p]=(0,s.useState)(null);return u[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,i.jsx)(m,{}),u[0]=e):e=u[0],u[1]===Symbol.for("react.memo_cache_sentinel")?(t={far:1e3,near:.1,position:q,up:[0,0,1],zoom:1},u[1]=t):t=u[1],u[2]===Symbol.for("react.memo_cache_sentinel")?(n=(0,i.jsx)(o.OrbitControls,{enableDamping:!1,ref:e=>p(e),target:K}),u[2]=n):n=u[2],u[3]===Symbol.for("react.memo_cache_sentinel")?(c=(0,i.jsx)(s.Suspense,{fallback:null,children:(0,i.jsx)(J,{})}),u[3]=c):c=u[3],u[4]!==f?(d=(0,i.jsxs)("div",{className:"flex h-screen w-screen flex-col",children:[e,(0,i.jsx)(a.Canvas,{camera:t,className:"flex-1 rounded-md bg-grid",children:(0,i.jsxs)(l.ControlsContext.Provider,{value:f,children:[n,c]})})]}),u[4]=f,u[5]=d):d=u[5],d}],96205)}]);
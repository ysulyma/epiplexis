import {useStore} from "../store";

/**  */
export function Form() {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const z = parseFloat(e.currentTarget.value);
    if (!isNaN(z)) {
      useStore.setState({z});
    }
  };
  return (
    <form>
      <input min="-1" max="1" step="any" type="range" onChange={onChange} />
    </form>
  );
}

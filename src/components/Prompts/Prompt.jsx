import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { hidePrompt } from "../../redux/features/promptSlice";
import { promptFunctions } from "../../utils/prompt";

const Prompt = () => {
  const { displayPrompt, promptMessage, cancelText, acceptText, parameters } = useSelector(state => state.prompt);
  const promptFunction = useMemo(() => promptFunctions[parameters.type], [parameters]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function executePrompt () {
    if (!promptFunction) return;
    const navigateTo = promptFunction(parameters.data);
    if (navigateTo) navigate(navigateTo);
  }
  function closePrompt() { dispatch(hidePrompt()) };

  return (
    <section className={`fixed z-[100] top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex items-center transition-opacity ${!displayPrompt && 'pointer-events-none opacity-0'}`}>
      <div className={`flex-1 w-full m-auto flex flex-col gap-4 max-w-[300px] overflow-hidden bg-black border border-white/5 p-2 rounded-[20px] transition-transform ${!displayPrompt && 'scale-50'}`}>
        <p className="px-4 py-2 font-semibold text-center text-gray-200 text-sm md:text-base">{promptMessage}</p>
        <div className="w-full flex justify-stretch gap-2 text-gray-200 text-xs md:text-sm">
            <button 
              className="px-4 flex-1 h-[40px] flex justify-center items-center rounded-[10px] bg-white/5 hover:bg-white/10 text-sm" 
              onClick={executePrompt}
            >
              {acceptText}
            </button>
            <button 
              className="px-4 flex-1 h-[40px] flex justify-center items-center rounded-[10px] bg-red-800 hover:bg-red-600 text-sm" 
              onClick={closePrompt}
            >
              {cancelText}
            </button>
        </div>
      </div>
    </section>
  )
}

export default Prompt

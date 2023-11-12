import { useSelector } from "react-redux"

import { useNavigate } from "react-router-dom"

import { hidePrompt } from "../../redux/features/promptSlice"

import { promptFunctions } from "../../utils/prompt"
import { useMemo } from "react"

const Prompt = () => {
  const { displayPrompt, promptMessage, cancelText, acceptText, parameters } = useSelector(state => state.prompt);
  const promptFunction = useMemo(() => promptFunctions[parameters.type], [parameters]);
  const navigate = useNavigate();

  function executePrompt () {
    if (!promptFunction) return;
    const navigateTo = promptFunction(parameters.data);
    if (navigateTo) navigate(navigateTo);
  }
  function closePrompt() { dispatch(hidePrompt()) };

  return (
    <section className={`fixed z-[100] top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-opacity ${!displayPrompt && 'pointer-events-none opacity-0'}`}>
      <div className={`w-full max-w-[300px] overflow-hidden bg-black border border-white/10 rounded-sm transition-transform ${!displayPrompt && 'scale-50'}`}>
        <p className="p-5 font-semibold text-center text-gray-200 text-sm md:text-base">{promptMessage}</p>
        <div className="w-full flex text-gray-200 text-xs md:text-sm">
            <button 
              className="py-2 flex-1 border-t border-white/10 hover:bg-white/5" 
              onClick={executePrompt}
            >
              {acceptText}
            </button>
            <button 
              className="py-2 flex-1 border-l border-white/10 bg-red-800 hover:bg-red-600 text-sm md:text-base" 
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

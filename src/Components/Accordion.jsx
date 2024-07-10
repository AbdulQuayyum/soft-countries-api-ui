import { PiCaretCircleDownLight } from "react-icons/pi";

const Accordion = ({ title, data, isOpen, toggleAccordion }) => {
  return (
    <div className="w-full">
      <div onClick={toggleAccordion} className="flex items-center justify-between p-5 bg-[#f4f4f4]">
        <div className="text-[#2E2C34] text-lg">{title}</div>
        <div className={`transition-all duration-150 cursor-pointer ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <PiCaretCircleDownLight size={24} />
        </div>
      </div>
      {isOpen && (
        <div className="p-5 bg-[#f4f4f4] shadow-md">
          <p className="text-base font-light text-[#667085]">{data}</p>
        </div>
      )}
    </div>
  );
};

export default Accordion;
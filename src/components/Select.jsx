import React from "react";
import { useId } from "react";
function Select({
    label,
    options,
    className="",
    ...props
},ref){
    // const Id=useId;
    return(
        <div className="w-full">
            {label && <label htmlFor="select01"
            className="inline-block mb-1 pl-1">
                {label}
            </label>}

            <select className={`px-3 py-2 rounded-lg bg-white
                text-black outline-none focuse:bg-gray-50 
                duration-200 border border-gray-200 w-full ${className}`}
                id="select01" ref={ref} {...props}>
                    
                    {options?.map((option)=>(
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select);
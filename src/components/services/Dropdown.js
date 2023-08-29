import { useState, useEffect } from "react";

function Dropdown(props) {

    const [dropDownVal, setDropDownVal] = useState("");

    useEffect(() => {
        setDefaults();
    }, [props.options]);



    function setDefaults() {
        if (props.defaultval) {
            setDropDownVal(props.defaultval);

        } else {
            if (props.options) {
                let val = props.options[0];
                if (val) {
                    console.log(val.selectionValue)
                    setDropDownVal(val.selectionValue);
                    props.setFieldStateValue(val.selectionValue);
                }
            }
        }
    }

    function handleChange(e) {
        setDropDownVal(e.target.value);
        props.setFieldStateValue(e.target.value);
    }


    return <>

        {props.defaultval == 'Sold' ?
            <div>SOLD</div> :
            <select {...props} value={dropDownVal} onChange={handleChange} className="form-control" >
                {
                    props.options.map(o =>    
                        <option value={o.selectionValue} key={o.id}>
                            {o.selectionValue}
                        </option>
                    )
                }
            </select>
        }
    </>;
}
export default Dropdown;
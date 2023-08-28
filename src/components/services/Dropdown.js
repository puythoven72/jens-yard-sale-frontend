import { useState ,useEffect} from "react";

function Dropdown(props) {
   
    const [dropDownVal, setDropDownVal] = useState(props.defaultval);

    useEffect(() => {
        
        setDropDownVal(props.defaultval)
        }, [props.options])


        function handleChange(e){
            console.log(e.target.value + "IS THE VAL");
            setDropDownVal(e.target.value);
            props.setFieldStateValue(e.target.value);
        }


    return <>

{props.defaultval == 'Sold' ? 

    <div>SOLD</div> : 

        <select {...props} value={dropDownVal} onChange={ handleChange} className="form-control" >
            selected = {props.o}
            {
                props.options.map(o =>
                    //   <option key={o.id}>
                    //         {Object.values(o)[1]}
                    //     </option>



                    <option value={Object.values(o)[1]} key={o.id}>
                        {Object.values(o)[1]}
                    </option>
                )

            }

        </select>

}
    </>;
}
export default Dropdown;
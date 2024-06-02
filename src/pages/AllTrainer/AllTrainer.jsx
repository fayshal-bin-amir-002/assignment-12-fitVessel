import { useState } from 'react';
import Select from 'react-select'
import { days } from '../../utils/days';
import { Checkbox } from '@material-tailwind/react';

const AllTrainer = () => {

    const [selectedOption, setSelectedOption] = useState(null);


    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const [exp, setExp] = useState([]);

    const handleCheck = (checked, value) => {
        const exist = exp.includes(value);
        if(!exist && checked) exp.push(value)
        if(exist && !checked) {
            const idx = exp.indexOf(value);
            exp.splice(idx, 1)
        }    
        console.log(exp);
    }

    // console.log(selectedOption);
    console.log(exp);
    return (
        <div className='min-h-[60vh]'>
            <p>all trainer</p>
            <div>
                <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={days}
                    isMulti={true}
                    className='w-[200px]'
                />

            </div>
            <div>
                <Checkbox onChange={(e) => handleCheck(e.target.checked, e.target.value)} value={"A"} label="A" />
                <Checkbox onChange={(e) => handleCheck(e.target.checked, e.target.value)} label="B" value={"B"} />
                <Checkbox onChange={(e) => handleCheck(e.target.checked, e.target.value)} label="C" value={"C"} />
                <Checkbox onChange={(e) => handleCheck(e.target.checked, e.target.value)} label="D" value={"D"} />
            </div>
        </div>
    );
};

export default AllTrainer;
import React from "react";
import styles from './index.module.scss';

interface ICustomInput {
    value?: string | number;
    onChange?: (e) => void;
    type?: string;
    placeholder: string;
}

const CustomInput = (props: ICustomInput) => {

    const { value = '', onChange, type = '', placeholder = '' } = props;

    return (
        <input
            className={styles.input_wrapper}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    )
}

export default CustomInput;
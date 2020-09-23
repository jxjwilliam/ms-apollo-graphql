import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Checkbox } from "@material-ui/core";

export default function () {
	const methods = useForm();
	const { handleSubmit, control, reset } = methods;
	const onSubmit = data => console.log(data);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{/* Option 1: pass a component to the Controller. */}
			<Controller as={TextField} name="TextField" control={control} defaultValue="" />

			{/* Option 2: use render props to assign events and value */}
			<Controller
				name="MyCheckbox"
				control={control}
				defaultValue={false}
				rules={{ required: true }}
				render={props => <Checkbox {...props} />} // props contains: onChange, onBlur and value
			/>
		</form>
	);
}

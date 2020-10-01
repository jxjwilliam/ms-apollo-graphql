import React, { useState } from "react"
import { useForm } from "react-hook-form"

// The following component is an example of your existing Input Component 
const Input = ({ label, register, required }) => (
	<>
		<label>{label}</label>
		<input name={label} ref={register({ required })} />
	</>
)

// you can use React.forwardRef to pass the ref too
const Select = React.forwardRef(({ label, register }, ref) => {
	const data = [];
	const onSelected = function () {

	}
	return (
		<>
			<label>{label}</label>
			<select name={label} ref={ref} onChange={onSelected}>
				{data.map(item => (
					<option key={item.id} value={item.value}>
						{item.label}
					</option>
				))}
			</select>
		</>
	)
})

export default function () {
	const { register, handleSubmit } = useForm();
	const [data, setData] = useState([])
	const onSubmit = data => console.log(data);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input label="First Name" register={register} required />
			<Select label="Age" ref={register} onSelected={} data={data} />
			<input type="submit" />
		</form>
	)
}
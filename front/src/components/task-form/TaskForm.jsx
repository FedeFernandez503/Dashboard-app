import { useState } from "react"
import { ReactComponent as CrossIcon } from "../../assets/svg/cross1.svg"
import "./TaskForm.css"

const TaskForm = ({ handleCloseModal, initialValues, setTasks, uid }) => {
	console.log(initialValues)
	const [task, setTask] = useState(
		initialValues || {
			_id: null,
			title: "",
			description: "",
			tag: "",
			priority: 2,
		}
	)
	const { title, description, tag, priority } = task
	const handleInputChange = (e) => {
		setTask({ ...task, [e.target.name]: e.target.value })
	}
	const handleSubmit = (e) => {
		e.preventDefault()

		const req = task._id
			? fetch(`http://localhost:5000/api/tasks/${task._id}`, {
					method: "PUT",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify({
						uid,
						...task,
					}),
			  })
			: fetch("http://localhost:5000/api/tasks/", {
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify({
						uid,
						...task,
					}),
			  })

		req
			.then((res) => {
				if (res.ok) return res.json()
				else Promise.reject()
			})
			.then((data) => {
				setTasks(data.tasks)
				handleCloseModal()
			})
			.catch(console.log)
	}
	return (
		<div
			className="task-from__modal-ctn"
			onClick={(e) => {
				if (e.target.classList.contains("task-from__modal-ctn")) {
					handleCloseModal()
				}
			}}
		>
			<form className="task-from__form" onSubmit={handleSubmit}>
				<h2>Create To-Do</h2>
				<button className="task-from__modal-cross" onClick={handleCloseModal}>
					<CrossIcon fill="#fff" height={15} />
				</button>
				<label>
					<p>Title:</p>
					<input
						name="title"
						value={title}
						onChange={handleInputChange}
						required
					/>
				</label>
				<label>
					<p>Description:</p>
					<input
						name="description"
						value={description}
						onChange={handleInputChange}
						required
					/>
				</label>
				<label>
					<p>Tag:</p>
					<input name="tag" value={tag} onChange={handleInputChange} required />
				</label>
				<label>
					<p>Priority</p>
					<select name="priority" value={priority} onChange={handleInputChange}>
						<option value="3">high</option>
						<option value="2">normal</option>
						<option value="1">low</option>
					</select>
				</label>
				<button>Create</button>
			</form>
		</div>
	)
}

export default TaskForm

import { useState, useEffect } from "react"
import TaskForm from "../../components/task-form/TaskForm"
import { ReactComponent as CrossIcon } from "../../assets/svg/cross1.svg"
import { ReactComponent as TickIcon } from "../../assets/svg/tick.svg"
import { ReactComponent as PenIcon } from "../../assets/svg/pen.svg"
import "./Dashboard.css"
export function Dashboard({ user }) {
	const [showTaskForm, setShowTaskForm] = useState(false)
	const [tasks, setTasks] = useState(user.tasks)
	const [tags, setTags] = useState([])
	const [filters, setFilters] = useState({
		tag: "all",
		priority: "all",
		done: "all",
	})
	const [task, setTask] = useState({
		title: "",
		description: "",
		tag: "",
		priority: 2,
	})

	useEffect(() => {
		setTags([...new Set(tasks.map((task) => task.tag))])
	}, [tasks])

	const handleCompelteTask = (task) => {
		fetch(`http://localhost:5000/api/tasks/${task._id}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				uid: user.uid,
				...task,
				done: true,
			}),
		})
			.then((res) => {
				if (res.ok) return res.json()
				else return Promise.reject()
			})
			.then((user) => {
				setTasks(user.tasks)
			})
			.catch((e) => console.log)
	}

	const handleDeleteTask = (id) => {
		fetch(`http://localhost:5000/api/tasks/${id}`, {
			method: "DELETE",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				uid: user.uid,
			}),
		})
			.then((res) => {
				if (res.ok) setTasks(tasks.filter((task) => task._id !== id))
				else return Promise.reject()
			})
			.catch((e) => {
				console.log(e)
			})
	}
	const handleChangeFilter = (e) => {
		setFilters({ ...filters, [e.target.name]: e.target.value })
	}

	return (
		<div className="dashboard__ctn">
			<h2>Dashboard</h2>
			<div className="dashboard__actions-ctn">
				<button
					className="dashbaord__create-todo-btn"
					onClick={() => {
						setTask({
							title: "",
							description: "",
							tag: "",
							priority: 2,
						})
						setShowTaskForm(true)
					}}
				>
					Create TODO
				</button>
				<div className="dashboard__filters">
					<div>
						<span>Tag:</span>
						<select
							onChange={handleChangeFilter}
							value={filters.tags}
							name="tag"
						>
							<option value="all">All</option>
							{tags.map((tag, i) => (
								<option key={i + tag} value={i}>
									{tag}
								</option>
							))}
						</select>
					</div>
					<div>
						<span>Done:</span>
						<select
							onChange={handleChangeFilter}
							value={filters.done}
							name="done"
						>
							<option value="all">All</option>
							<option value="false">Ongoing</option>
							<option value="true">Done</option>
						</select>
					</div>
					<div>
						<span>Priority:</span>
						<select
							onChange={handleChangeFilter}
							name="priority"
							value={filters.priority}
						>
							<option value="all">All</option>
							<option value="3">High</option>
							<option value="2">Normal</option>
							<option value="1">Low</option>
						</select>
					</div>
				</div>
			</div>
			<div className="dashboard__notes-ctn">
				<ul>
					{tasks
						.filter(
							(task) =>
								(task.tag == tags[filters.tag] || filters.tag == "all") &&
								(String(task.done) == filters.done || filters.done == "all") &&
								(task.priority == filters.priority || filters.priority == "all")
						)
						.map((task) => (
							<li
								key={task._id}
								className={`dashboard__note-item ${
									task.done ? "done" : ""
								} priority-${task.priority}`}
							>
								<button
									className="dashboard__note__delete-btn"
									onClick={() => handleDeleteTask(task._id)}
								>
									<CrossIcon height={15} fill="#311b92" />
								</button>
								{!task.done && (
									<button
										className="dashboard__note__edit-btn"
										onClick={() => {
											setTask(task)
											setShowTaskForm(true)
										}}
									>
										<PenIcon height={16} fill="#311b92" />
									</button>
								)}
								<h2>{task.title}</h2>
								<p className="dashboard__note__description">
									{task.description}
								</p>
								<p className="dashboard__note__tag">TAG: {task.tag}</p>
								<button
									className={`dashboard__note__status-btn ${
										task.done ? "done" : ""
									}`}
									onClick={() => {
										!task.done && handleCompelteTask(task)
									}}
								>
									{task.done ? <TickIcon fill="#fff" width={24} /> : "Set Done"}
								</button>
							</li>
						))}
				</ul>
			</div>
			{showTaskForm && (
				<TaskForm
					uid={user.uid}
					initialValues={task}
					setTasks={setTasks}
					handleCloseModal={() => setShowTaskForm(false)}
				/>
			)}
		</div>
	)
}

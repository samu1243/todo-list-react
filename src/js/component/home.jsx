import React, { useState, useEffect, useRef } from "react";
import { Button, Card, Form, Stack } from "react-bootstrap";
import {
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from "@chakra-ui/react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
function Todo({ todo, index, removeTodo }) {
	return (
		<div className="todo">
			<span>{todo.text}</span>
			<div>
				<Button
					variant="outline-danger"
					onClick={() => removeTodo(index)}>
					✕
				</Button>
			</div>
		</div>
	);
}

function FormTodo({ addTodo }) {
	const [value, setValue] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!value) return;
		addTodo(value);
		setValue("");
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group>
				<Form.Control
					type="text"
					className="input"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder="Add new to-do by pressing enter"
					border="danger"
				/>
			</Form.Group>
		</Form>
	);
}

function Home() {
	const [todos, setTodos] = useState([
		{
			text: "Hacer proyecto 4Geeks",
		},
	]);

	const addTodo = (text) => {
		const newTodos = [...todos, { text }];
		setTodos(newTodos);
	};

	const removeTodo = (index) => {
		const newTodos = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
	};
	const CustomAlert = () => {
		return (
			<div>
				<Stack spacing={3}>
					<Alert status="success" variant="solid">
						<AlertIcon />
						No task left, good job!
					</Alert>
				</Stack>
			</div>
		);
	};

	return (
		<div className="home">
			<div className="container">
				<Card border="secondary">
					<h1 id="text-todo" className="text-center">
						To-dos
					</h1>
				</Card>
				<FormTodo addTodo={addTodo} />
				<div>
					{todos.map((todo, index) => (
						<Card border="secondary">
							<Card.Body>
								<Todo
									key={index}
									index={index}
									todo={todo}
									removeTodo={removeTodo}
								/>
							</Card.Body>
						</Card>
					))}
				</div>
				{todos.length === 0 ? (
					<CustomAlert />
				) : (
					<Card border="secondary">
						<Card.Footer>
							<small className="text-muted">
								{todos.length} To-dos left
							</small>
						</Card.Footer>
					</Card>
				)}
			</div>
		</div>
	);
}
export default Home;

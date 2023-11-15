import axios from "axios";

const TODO_REST_API_URL='http://localhost:3001/todolist';

class TodoService{

    getTodos(){
        return axios.get(`${TODO_REST_API_URL}/todoAll`);
    }

    getDoneTodos(){
        return axios.get(`${TODO_REST_API_URL}/todoCompleted/true`);
    }

    getNotDoneTodos(){
        return axios.get(`${TODO_REST_API_URL}/todoCompleted/false`);
    }

    addTodo(newTodo){
        return axios.post(`${TODO_REST_API_URL}/todoAdd/${newTodo}`);
    }

    updateTodoCheck(updateTodoid,done){
        return axios.put(`${TODO_REST_API_URL}/todoUpdateCompleted/${updateTodoid}/${done}`);
    }

    updateTodoContent(updateTodoid,content){
        return axios.put(`${TODO_REST_API_URL}/todoUpdate/${updateTodoid}/${content}`);
    }

    deleteTodo(idTodo){
        return axios.delete(`${TODO_REST_API_URL}/deleteTodo/${idTodo}`);
    }

    deleteAllTodo(){
        return axios.delete(`${TODO_REST_API_URL}/deleteAllTodo`);
    }

    deleteDoneAllTodo(){
        return axios.delete(`${TODO_REST_API_URL}/deleteCompletedTodo`);
    }
}

export default new TodoService()
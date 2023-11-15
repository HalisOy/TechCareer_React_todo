package com.HalisOy.todo.controller;


import com.HalisOy.todo.entity.Todo;
import com.HalisOy.todo.exception.Resource404NotFoundException;
import com.HalisOy.todo.repository.ITodoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(allowedHeaders = "*")
@RequestMapping("/todolist")
public class todoController {
    private final ITodoRepository todoRepo;

    public todoController(ITodoRepository todoRepo) {
        this.todoRepo = todoRepo;
    }

    //Find
    public Todo getFindTodoById(Long Id, String ErrorMessage){
        return todoRepo.findById(Id).orElseThrow(()-> new Resource404NotFoundException(ErrorMessage));
    }

    // Get All
    @GetMapping("/todoAll")
    public List<Todo> getTodolist(){
        return todoRepo.findAll();
    }

    @PostMapping("/todoAdd/{content}")
    public void addTodo(@PathVariable(name = "content") String content){
        Todo newTodo=new Todo();
        newTodo.setContent(content);
        todoRepo.save(newTodo);
    }

    // Toggle To do
    @PostMapping("/todoCompleted/{Id}")
    public void todoCompleted (@PathVariable(name = "Id") Long Id){
        Todo getTodo = getFindTodoById(Id, "Error Toggle Completed");
        getTodo.setCompleted(!getTodo.getCompleted());
        todoRepo.save(getTodo);
    }

    @PostMapping("/todoMultipleAdd")
    public String addSpeedTodo(@RequestBody List<Todo> content){
        List<Todo> savedTodoList=new ArrayList<>();
        todoRepo.saveAll(content).forEach(savedTodoList::add);
        return "Saved: todo ids - " + savedTodoList.stream().map(u->u.getContent()).collect(Collectors.toList());
    }

    // Get Done To do
    @GetMapping("/todoCompleted/{boolData}")
    public List<Todo> completedTodo(@PathVariable(name = "boolData") Boolean completed){
        return  todoRepo.findByCompleted(completed);
    }

    // Update To do
    @PutMapping("/todoUpdate/{Id}/{content}")
    public ResponseEntity<Todo> updateTodoContent(@PathVariable(name = "Id") Long Id, @PathVariable(name = "content") String todocontent){

        Todo getTodo = getFindTodoById(Id, "Error Update");
        getTodo.setContent(todocontent);

        Todo updateTodo= todoRepo.save(getTodo);

        return ResponseEntity.ok().body(updateTodo);
    }

    @PutMapping("/todoUpdateCompleted/{Id}/{completed}")
    public ResponseEntity<Todo> updateTodoCompleted(@PathVariable(name = "Id") Long Id, @PathVariable(name = "completed") Boolean completed){

        Todo getTodo = getFindTodoById(Id, "Error Update");
        getTodo.setCompleted(!completed);

        Todo updateTodo= todoRepo.save(getTodo);

        return ResponseEntity.ok().body(updateTodo);
    }

    // Delete To do
    @DeleteMapping("/deleteTodo/{Id}")
    public void deleteTodo(@PathVariable(name = "Id") Long Id){
        Todo getTodo = getFindTodoById(Id, "Error Delete");
        todoRepo.delete(getTodo);
    }

    // Delete Completed To do
    @DeleteMapping("/deleteCompletedTodo")
    public void deleteCompletedTodo(){
        List<Todo> todoList = todoRepo.findByCompleted(true);
        todoList.forEach((todo)->
                todoRepo.delete(todo));
    }

    // Delete All To do
    @DeleteMapping("deleteAllTodo")
    public void deleteAllTodo(){
        todoRepo.deleteAll();
    }

}

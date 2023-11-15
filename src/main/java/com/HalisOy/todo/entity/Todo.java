package com.HalisOy.todo.entity;


import jakarta.persistence.*;

import java.io.Serializable;

@Entity(name = "Todolist")
@Table(name = "TodoLib")
public class Todo{
    @Id
    @Column(name = "Todo_Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Todo_Content")
    private String content;

    @Column(name = "Todo_Completed")
    private Boolean completed = Boolean.FALSE;

    public Todo() {
    }

    public Todo(Long id, String content, Boolean completed) {
        this.id = id;
        this.content = content;
        this.completed = completed;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
}

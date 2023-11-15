package com.HalisOy.todo.repository;

import com.HalisOy.todo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.sql.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public interface ITodoRepository extends JpaRepository<Todo, Long> {

    @Query("select c from Todolist c where c.completed = :completed")
    List<Todo> findByCompleted(Boolean completed);


}

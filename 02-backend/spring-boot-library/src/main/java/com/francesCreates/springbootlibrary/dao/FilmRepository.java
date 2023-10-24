package com.francesCreates.springbootlibrary.dao;

import com.francesCreates.springbootlibrary.entity.Film;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;



//automatically creates all the http requests
public interface FilmRepository extends JpaRepository<Film,Long> {

    Page<Film> findByTitleContaining(@RequestParam("title") String title, Pageable pageable);

    Page<Film> findByCategory(@RequestParam("category")String category, Pageable pageable);
}

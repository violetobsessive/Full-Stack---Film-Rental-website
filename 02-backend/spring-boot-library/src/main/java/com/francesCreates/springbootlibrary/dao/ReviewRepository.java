package com.francesCreates.springbootlibrary.dao;

import com.francesCreates.springbootlibrary.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface ReviewRepository extends JpaRepository<Review,Long>{
    Page<Review> findByFilmId(@RequestParam("film_id") Long filmId, Pageable pageable);

}

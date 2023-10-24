package com.francesCreates.springbootlibrary.dao;

import com.francesCreates.springbootlibrary.entity.Checkout;
import org.hibernate.annotations.Check;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {

    Checkout findByUserEmailAndFilmId(String userEmail, Long filmId);

    List<Checkout> findFilmByUserEmail(String userEmail);
}
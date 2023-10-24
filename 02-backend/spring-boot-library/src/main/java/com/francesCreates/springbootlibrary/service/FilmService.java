package com.francesCreates.springbootlibrary.service;

import com.francesCreates.springbootlibrary.dao.CheckoutRepository;
import com.francesCreates.springbootlibrary.dao.FilmRepository;
import com.francesCreates.springbootlibrary.entity.Checkout;
import com.francesCreates.springbootlibrary.entity.Film;
import org.hibernate.annotations.Check;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;


@Service
@Transactional
public class FilmService {

    private FilmRepository filmRepository;

    private CheckoutRepository checkoutRepository;

    //constructor dependency injection
    public FilmService(FilmRepository filmRepository, CheckoutRepository checkoutRepository){
        this.filmRepository = filmRepository;
        this.checkoutRepository = checkoutRepository;
    }
    public Film checkoutFilm (String userEmail, Long filmId) throws Exception {
        Optional<Film> film = filmRepository.findById(filmId);

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndFilmId(userEmail,filmId);

        if(!film.isPresent() || validateCheckout!= null || film.get().getCopiesAvailable() <= 0 ){
            throw new Exception("Film doesn't exist or already checked out by user");
        }
        film.get().setCopiesAvailable(film.get().getCopiesAvailable() -1);
        filmRepository.save(film.get());

        Checkout checkout = new Checkout(
                userEmail,
                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(),
                film.get().getId()
        );

        checkoutRepository.save(checkout);

        return film.get();
    }

    public Boolean checkoutFilmByUser(String userEmail, Long filmId){
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndFilmId(userEmail,filmId);
        if(validateCheckout != null){
            return true;
        }else{
            return false;
        }
    }
    public int currentLoansCount(String userEmail){
        return checkoutRepository.findFilmByUserEmail(userEmail).size();
    }




}

package com.francesCreates.springbootlibrary.controller;

//the API endpoint that calls the service
//react application will be able to call the controller without getting a cause error

import com.francesCreates.springbootlibrary.entity.Film;
import com.francesCreates.springbootlibrary.service.FilmService;
import com.francesCreates.springbootlibrary.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/films")

public class FilmController {

    private FilmService filmService;

    @Autowired
    public FilmController(FilmService filmService){
        this.filmService = filmService;
    }
    @GetMapping("/secure/currentloans/count")
    //pull the value of key authorization out into "token"
    //pass the access token to backend
    public int currentLoansCount(@RequestHeader(value = "Authorization")String token){
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return filmService.currentLoansCount(userEmail);
    }

    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutFilmByUser(@RequestHeader(value = "Authorization")String token,
                                      @RequestParam Long filmId){
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return filmService.checkoutFilmByUser(userEmail, filmId);
    }


    @PutMapping("/secure/checkout")
    public Film checkoutFilm (@RequestHeader(value = "Authorization")String token,
                              @RequestParam Long filmId) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return filmService.checkoutFilm(userEmail, filmId);
    }





}

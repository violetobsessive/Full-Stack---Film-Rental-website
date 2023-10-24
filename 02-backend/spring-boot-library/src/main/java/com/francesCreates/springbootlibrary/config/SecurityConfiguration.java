package com.francesCreates.springbootlibrary.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // Disable Cross State Request Forgery
        // CSRF protection is a security feature that
        // helps prevent malicious websites from making
        // unauthorized requests on behalf of a user
        http.csrf().disable();

        // Protect endpoints at /api/<type>/secure
        http.authorizeRequests(configurer ->
                configurer.antMatchers("/api/films/secure/**")
                        .authenticated())
                .oauth2ResourceServer()
                .jwt();
        //  this application is acting as a resource server,
        //  which provides protected resources that the client can access
        // configures JSON Web Token (JWT) support for the OAuth 2.0 resource server.
        // JWT is a compact, self-contained way of transmitting information securely between parties

        // Add CORS filters
        http.cors();

        // Add content negotiation strategy
        http.setSharedObject(ContentNegotiationStrategy.class,
                new HeaderContentNegotiationStrategy());

        // Force a non-empty response body for 401 (unauthenticated state code)
        // back to the user for readability purposes
        Okta.configureResourceServer401ResponseBody(http);

        return http.build();
    }

}

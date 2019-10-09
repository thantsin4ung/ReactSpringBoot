/*
package com.react.crud.SpringReactCrud.repository;

import com.react.crud.SpringReactCrud.domain.Event;
import com.react.crud.SpringReactCrud.domain.Group;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.stream.Stream;

@Component
public class Initializer implements CommandLineRunner {

    private GroupRepository repository;

    public Initializer(GroupRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        Stream.of("Mark2 IRV", "Mazada RX8", "Evolution Lancer 9", "Nissan GTR34", "EVO X")
                .forEach(name -> repository.save(new Group(name)));

        Group result = repository.findByName("Mark2 IRV");
        Event e = Event.builder()
                .title("React Spring Boot")
                .description("Full stack Example Racer Group")
                .date(Instant.parse("2019-10-10T18:00:00.000Z"))
                .build();
        repository.save(result);
        repository.findAll().forEach(System.out::println);
    }
}
*/

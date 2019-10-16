package com.react.crud.SpringReactCrud.controller;

import com.react.crud.SpringReactCrud.domain.Group;
import com.react.crud.SpringReactCrud.domain.User;
import com.react.crud.SpringReactCrud.repository.GroupRepository;
import com.react.crud.SpringReactCrud.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/v1")

public class GroupController {

    private GroupRepository repository;
    private UserRepository userRepository;

    public GroupController(GroupRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    //TODO find All
    @GetMapping("/groups")
    public List<Group> groups(Principal principal){
        return repository.findAllByUserId(principal.getName());
    }

    //TODO find by ID
    @GetMapping("/group/{id}")
    public ResponseEntity<Group> getGroup(@PathVariable(value = "id") Long id) {
        return repository.findById(id)
        .map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    //TODO create
    @PostMapping("/group")
    public ResponseEntity<Group> createGroup(@RequestBody @Valid Group group,
                                             @AuthenticationPrincipal OAuth2User principal) throws URISyntaxException {

        Map<String, Object> details = principal.getAttributes();
        String userId = details.get("sub").toString();

        Optional<User> user = userRepository.findById(userId);
        group.setUser(user.orElse(new User(userId, details.get("name").toString(), details.get("email").toString())));

        Group g = repository.save(group);
        return ResponseEntity.created(new URI("/api/v1/group" + g.getId())).body(g);
    }
    //TODO update
    @PutMapping("/group/{id}")
    public ResponseEntity<Group> updateGroup(@RequestBody @Valid Group group) {
        Group g = repository.save(group);
        return ResponseEntity.ok().body(g);
    }
    //TODO delete
    @DeleteMapping("/group/{id}")
    public ResponseEntity<?> deleteGroup(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}

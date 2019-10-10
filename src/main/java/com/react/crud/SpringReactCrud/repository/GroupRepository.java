package com.react.crud.SpringReactCrud.repository;

import com.react.crud.SpringReactCrud.domain.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupRepository extends JpaRepository<Group, Long> {
    Group findByName(String name);
    List<Group> findAllByUserId(String id);
}

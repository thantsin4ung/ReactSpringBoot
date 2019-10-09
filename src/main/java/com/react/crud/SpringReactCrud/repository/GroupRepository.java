package com.react.crud.SpringReactCrud.repository;

import com.react.crud.SpringReactCrud.domain.Group;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Group, Long> {
    Group findByName(String name);
}

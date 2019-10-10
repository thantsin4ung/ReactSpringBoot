package com.react.crud.SpringReactCrud.repository;

import com.react.crud.SpringReactCrud.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}

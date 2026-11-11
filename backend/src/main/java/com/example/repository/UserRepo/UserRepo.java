package com.example.repository.UserRepo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import com.example.entity.UserEntity;

import jakarta.transaction.Transactional;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepo extends JpaRepository<UserEntity, String> {
   //Update display name
   @Query(value = "UPDATE user SET display_name = :displayName WHERE uid = :uid", nativeQuery = true)
   void updateDisplayName(@Param("uid") String uid, @Param("displayName") String displayName);
   @Modifying
   @Transactional 
   @Query (value = """
   INSERT INTO users (user_id,display_name,email) VALUES (:uid, :displayName, :email)
   """, nativeQuery = true)
   void registerUID(@Param("uid") String uid, @Param("email") String email, @Param("displayName") String displayName);

   @Query (value = "SELECT CASE WHEN COUNT(user_id) > 0 THEN true ELSE false END FROM users WHERE user_id = :uid", nativeQuery = true)
   Long userExists(@Param("uid") String uid);


}

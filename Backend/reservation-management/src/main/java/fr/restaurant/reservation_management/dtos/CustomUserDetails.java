package fr.restaurant.reservation_management.dtos;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {
    private String email;
    private String password;
    private Long userId;  // Ajoutez l'ID de l'utilisateur
    private GrantedAuthority authority;  // Un seul rôle

    // Constructeur
    public CustomUserDetails(String email, String password, Long userId, GrantedAuthority authority) {
        this.email = email;
        this.password = password;
        this.userId = userId;
        this.authority = authority;
    }

    public Long getUserId() {
        return userId;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(authority);  // Retourne une liste contenant le rôle unique
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

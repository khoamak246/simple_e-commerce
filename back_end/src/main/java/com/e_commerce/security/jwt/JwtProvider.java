package com.e_commerce.security.jwt;

import com.e_commerce.security.userPrincipal.UserPrincipal;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Slf4j
public class JwtProvider {

    @Value("${JWT_SECRET_KEY}")
    private String SECRET_KEY;
    @Value("${JWT_EXPIRED_TIME}")
    private long TOKEN_EXPIRED_TIME;

    public String generateToken(Authentication authentication){
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + TOKEN_EXPIRED_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();

    }

    public boolean validateToken(String token){
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            log.error("ERROR -> EXPIRED TOKEN Message {}", e.getMessage());
        } catch (UnsupportedJwtException e){
            log.error("ERROR -> UNSUPPORTED TOKEN {}", e.getMessage());
        } catch (MalformedJwtException e){
            log.error("ERROR -> INCORRECT FORMAT TOKEN Message {}", e.getMessage());
        } catch (SignatureException e){
            log.error("ERROR -> INCORRECT SIGNATURE TOKEN Message {}", e.getMessage());
        } catch (IllegalArgumentException e){
            log.error("ERROR -> CLAIMS EMPTY TOKEN  Message {}", e.getMessage());
        }
        return false;
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY)
                .parseClaimsJws(token).getBody().getSubject();
    }

    public long getExpiredTimeFromToken(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY)
                .parseClaimsJws(token).getBody().getExpiration().getTime();
    }
}

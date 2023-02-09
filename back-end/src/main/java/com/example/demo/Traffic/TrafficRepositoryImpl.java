package com.example.demo.Traffic;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

@Service
public class TrafficRepositoryImpl implements TrafficRepositoryCustom {
    @PersistenceContext
    private EntityManager em;

    public List<Traffic> findTraffic(Traffic criteria) throws IllegalArgumentException, IllegalAccessException {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Traffic> query = cb.createQuery(Traffic.class);
        Root<Traffic> t = query.from(Traffic.class);

        List<Predicate> predicates = new ArrayList<>();
        for (Field field: criteria.getClass().getDeclaredFields()) {
            field.setAccessible(true);
            if (field.get(criteria) != null) {
                predicates.add(cb.equal(t.get(field.getName()), field.get(criteria)));
            }
        }

        query.select(t).where(cb.and(predicates.toArray(new Predicate[0])));
        return em.createQuery(query).getResultList();
    }
}
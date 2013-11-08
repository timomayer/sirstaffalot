select * from teammember;
select * from assignable;
select * from assignment;

  alter table assignment drop PRIMARY KEY, add primary key (cw, year, AssignableId, TeamMemberId);


-- Input 2013_31 - 2013_45
-- Request 1: assignables within [x,y] with staff per cw
-- select assignable.name assignableName, assignable.id assignableId, assignment.cw, teammember.id teamMemberId, assignment.days, teammember.name teamMemberName, assignable.days assignableDays from assignment
select assignable.name assignableName, assignable.type assignableType, assignable.id assignableId, assignment.cw, teammember.id teamMemberId, teammember.type teammemberType, assignment.days, assignment.year, teammember.name teamMemberName, assignable.days assignableDays from assignment
  inner join assignable on assignable.id = assignment.AssignableId
  inner join teammember on teammember.id = assignment.TeamMemberId
inner join (select cw from )
  where
    assignment.year >= 2013 and assignment.cw >= 31
    and
    assignment.year <= 2013 and assignment.cw <= 47
  order by assignable.name, assignable.id, assignment.cw, teammember.name, teammember.id;

-- Staffed:
-- List of assignments (with corresponding assignables and assigned team members)
-- where at least one assignment changed since the last staffing mail for this assignable.
-- The list only contains assignables that are fully staffed.
select assignable.name, assignable.startDate, assignable.endDate, assignable.fromEmail ,teammember.name, assignment.updatedAt assignmentUpdatedAt, assignable.lastMailDate from assignment
  inner join assignable on assignable.id = assignment.AssignableId
  inner join teammember on teammember.id = assignment.TeamMemberId
  where (assignable.lastMailDate is null or assignable.lastMailDate < assignment.updatedAt) -- there was a change since last staffing mail
   and assignable.fromEmail is not null
   and assignable.days <= (select sum(assignment.days) from assignment where assignment.assignableid = assignable.id)-- status is "completely staffed"
  order by assignable.name, teammember.name
  ;

-- Not yet staffed:
-- List of assignments (with corresponding assignables and assigned team members)
-- where at least one assignment changed since the last staffing mail for this assignable.
-- The list only contains assignables that are NOT yet fully staffed.
select assignable.name, assignable.startDate, assignable.endDate, assignable.fromEmail ,teammember.name, assignment.updatedAt assignmentUpdatedAt, assignable.lastMailDate from assignment
  inner join assignable on assignable.id = assignment.AssignableId
  inner join teammember on teammember.id = assignment.TeamMemberId
  where (assignable.lastMailDate is null or assignable.lastMailDate < assignment.updatedAt) -- there was a change since last staffing mail
   and assignable.fromEmail is not null
   and assignable.days > (select sum(assignment.days) from assignment where assignment.assignableid = assignable.id)-- status is "completely staffed"
  order by assignable.name, teammember.name
  ;


-- Overview needed days / staffed days
select assignable.name, assignable.days, sum(assignment.days)
  from assignment
  inner join assignable on assignable.id = assignment.AssignableId
  where assignable.fromEmail is not null
  group by assignable.id;


update assignable set days = 15 where id = 1;
update assignable set lastMailDate = '2013-11-07 00:00:00' where id in (1);

select fromEmail, assignable.name from assignment
  inner join assignable on assignable.id = assignment.AssignableId
  where (assignable.lastMailDate is null or assignable.lastMailDate < assignment.updatedAt) and assignable.type in ('project')
group by assignable.name, fromEmail;






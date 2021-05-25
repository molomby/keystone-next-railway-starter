-- Create some seed data
-- Login is admin@example.com / TPlfK14TjUgo
with admin as (
	insert into "Person" ("name", "email", "password", "isAdmin")
	values ('Freddy Blamf', 'admin@example.com', '$2y$10$DJKYw3DS5HKFT2bI.SEF.Oze6zY8UpvwzUdB5bEPIjb8r8033fwBq', true)
	returning id
)
insert into "Task" ("label", "priority", "assignedTo")
values
('Smooth the dinglebop out with a schleem', 'medium', (select id from admin)),
('Repurposed schleem for later batches', 'low', (select id from admin)),
('Push dinglebop through grumbo', 'medium', (select id from admin)),
('Rub dinglebop with fleeb/fleeb juice', 'high', (select id from admin)),
('Liase with and direct schlami', 'medium', (select id from admin)),
('Divide fleeb', 'low', (select id from admin)),
('Ensure blamfs rub chumbles', 'low', (select id from admin)),
('Remove ploobis and grumbo', 'medium', (select id from admin)),
('Package and distribute plumbus', 'high', (select id from admin));

# Seven. Using the Language: An Extended Example
The preceding three chapters introduced a pattern language for honing the fine detail of a model and maintaining a tight MODEL-DRIVEN DESIGN. In the earlier examples, the patterns were mostly applied one at a time, but on a real project you have to combine them. This chapter presents one elaborate example (still drastically simpler than a real project, of course). The example will step through a succession of model and design refinements as a hypothetical team deals with requirements and implementation issues and develops a MODEL-DRIVEN DESIGN, showing the forces that apply and how the patterns of Part II can resolve them.

INTRODUCING THE CARGO SHIPPING SYSTEM
We’re developing new software for a cargo shipping company. The initial requirements are three basic functions.

1. Track key handling of customer cargo

2. Book cargo in advance

3. Send invoices to customers automatically when the cargo reaches some point in its handling

In a real project, it would take some time and iteration to get to the clarity of this model. Part III of this book will go into the discovery process in depth. But here we’ll start with a model that has the needed concepts in a reasonable form, and we’ll focus on fine-tuning the details to support design.

Image
Figure 7.1. A class diagram representing a model of the shipping domain

This model organizes domain knowledge and provides a language for the team. We can make statements like this:

“Multiple Customers are involved with a Cargo, each playing a different role.”

“The Cargo delivery goal is specified.”

“A series of Carrier Movements satisfying the Specification will fulfill the delivery goal.”

Each object in the model has a clear meaning:

A Handling Event is a discrete action taken with the Cargo, such as loading it onto a ship or clearing it through customs. This class would probably be elaborated into a hierarchy of different kinds of incidents, such as loading, unloading, or being claimed by the receiver.

Delivery Specification defines a delivery goal, which at minimum would include a destination and an arrival date, but it can be more complex. This class follows the SPECIFICATION pattern (see Chapter 9).

This responsibility could have been taken on by the Cargo object, but the abstraction of Delivery Specification gives at least three advantages.

1. Without Delivery Specification, the Cargo object would be responsible for the detailed meaning of all those attributes and associations for specifying the delivery goal. This would clutter up Cargo and make it harder to understand or change.

2. This abstraction makes it easy and safe to suppress detail when explaining the model as a whole. For example, there could be other criteria encapsulated in the Delivery Specification, but a diagram at this level of detail would not have to expose it. The diagram is telling the reader that there is a SPECIFICATION of delivery, and the details of that are not important to think about (and, in fact, could be easily changed later).

3. This model is more expressive. Adding Delivery Specification says explicitly that the exact means of delivery of the Cargo is undetermined, but that it must accomplish the goal set out in the Delivery Specification.

A role distinguishes the different parts played by Customers in a shipment. One is the “shipper,” one the “receiver,” one the “payer,” and so on. Because only one Customer can play a given role for a particular Cargo, the association becomes a qualified many-to-one instead of many-to-many. Role might be implemented as simply a string, or it could be a class if other behavior is needed.

Carrier Movement represents one particular trip by a particular Carrier (such as a truck or a ship) from one Location to another. Cargoes can ride from place to place by being loaded onto Carriers for the duration of one or more Carrier Movements.

Delivery History reflects what has actually happened to a Cargo, as opposed to the Delivery Specification, which describes goals. A Delivery History object can compute the current Location of the Cargo by analyzing the last load or unload and the destination of the corresponding Carrier Movement. A successful delivery would end with a Delivery History that satisfied the goals of the Delivery Specification.

All the concepts needed to work through the requirements just described are present in this model, assuming appropriate mechanisms to persist the objects, find the relevant objects, and so on. Such implementation issues are not dealt with in the model, but they must be in the design.

In order to frame up a solid implementation, this model still needs some clarification and tightening.

Remember, ordinarily, model refinement, design, and implementation should go hand-in-hand in an iterative development process. But in this chapter, for clarity of explanation, we are starting with a relatively mature model, and changes will be motivated strictly by the need to connect that model with a practical implementation, employing the building block patterns.

Ordinarily, as the model is being refined to support the design better, it should also be refined to reflect new insight into the domain. But in this chapter, for clarity of explanation, changes will be strictly motivated by the need to connect with a practical implementation, employing the building block patterns.

ISOLATING THE DOMAIN: INTRODUCING THE APPLICATIONS
To prevent domain responsibilities from being mixed with those of other parts of the system, let’s apply LAYERED ARCHITECTURE to mark off a domain layer.

Without going into deep analysis, we can identify three user-level application functions, which we can assign to three application layer classes.

1. A Tracking Query that can access past and present handling of a particular Cargo

2. A Booking Application that allows a new Cargo to be registered and prepares the system for it

3. An Incident Logging Application that can record each handling of the Cargo (providing the information that is found by the Tracking Query)

These application classes are coordinators. They should not work out the answers to the questions they ask. That is the domain layer’s job.

DISTINGUISHING ENTITIES AND VALUE OBJECTS
Considering each object in turn, we’ll look for identity that must be tracked or a basic value that is represented. First we’ll go through the clear-cut cases and then consider the more ambiguous ones.

Customer
Let’s start with an easy one. A Customer object represents a person or a company, an entity in the usual sense of the word. The Customer object clearly has identity that matters to the user, so it is an ENTITY in the model. How to track it? Tax ID might be appropriate in some cases, but an international company could not use that. This question calls for consultation with a domain expert. We discuss the problem with a businessperson in the shipping company, and we discover that the company already has a customer database in which each Customer is assigned an ID number at first sales contact. This ID is already used throughout the company; using the number in our software will establish continuity of identity between those systems. It will initially be a manual entry.

Cargo
Two identical crates must be distinguishable, so Cargo objects are ENTITIES. In practice, all shipping companies assign tracking IDs to each piece of cargo. This ID will be automatically generated, visible to the user, and in this case, probably conveyed to the customer at booking time.

Handling Event and Carrier Movement
We care about such individual incidents because they allow us to keep track of what is going on. They reflect real-world events, which are not usually interchangeable, so they are ENTITIES. Each Carrier Movement will be identified by a code obtained from a shipping schedule.

Another discussion with a domain expert reveals that Handling Events can be uniquely identified by the combination of Cargo ID, completion time, and type. For example, the same Cargo cannot be both loaded and unloaded at the same time.

Location
Two places with the same name are not the same. Latitude and longitude could provide a unique key, but probably not a very practical one, since those measurements are not of interest to most purposes of this system, and they would be fairly complicated. More likely, the Location will be part of a geographical model of some kind that will relate places according to shipping lanes and other domain-specific concerns. So an arbitrary, internal, automatically generated identifier will suffice.

Delivery History
This is a tricky one. Delivery Histories are not interchangeable, so they are ENTITIES. But a Delivery History has a one-to-one relationship with its Cargo, so it doesn’t really have an identity of its own. Its identity is borrowed from the Cargo that owns it. This will become clearer when we model the AGGREGATES.

Delivery Specification
Although it represents the goal of a Cargo, this abstraction does not depend on Cargo. It really expresses a hypothetical state of some Delivery History. We hope that the Delivery History attached to our Cargo will eventually satisfy the Delivery Specification attached to our Cargo. If we had two Cargoes going to the same place, they could share the same Delivery Specification, but they could not share the same Delivery History, even though the histories start out the same (empty). Delivery Specifications are VALUE OBJECTS.

Role and Other Attributes
Role says something about the association it qualifies, but it has no history or continuity. It is a VALUE OBJECT, and it could be shared among different Cargo/Customer associations.

Other attributes such as time stamps or names are VALUE OBJECTS.

DESIGNING ASSOCIATIONS IN THE SHIPPING DOMAIN
None of the associations in the original diagram specified a traversal direction, but bidirectional associations are problematic in a design. Also, traversal direction often captures insight into the domain, deepening the model itself.

If the Customer has a direct reference to every Cargo it has shipped, it will become cumbersome for long-term, repeat Customers. Also, the concept of a Customer is not specific to Cargo. In a large system, the Customer may have roles to play with many objects. Best to keep it free of such specific responsibilities. If we need the ability to find Cargoes by Customer, this can be done through a database query. We’ll return to this issue later in this chapter, in the section on REPOSITORIES.

If our application were tracking the inventory of ships, traversal from Carrier Movement to Handling Event would be important. But our business needs to track only the Cargo. Making the association traversable only from Handling Event to Carrier Movement captures that understanding of our business. This also reduces the implementation to a simple object reference, because the direction with multiplicity was disallowed.

The rationale behind the remaining decisions is explained in Figure 7.2, on the next page.

Image
Figure 7.2. Traversal direction has been constrained on some associations.

There is one circular reference in our model: Cargo knows its Delivery History, which holds a series of Handling Events, which in turn point back to the Cargo. Circular references logically exist in many domains and are sometimes necessary in design as well, but they are tricky to maintain. Implementation choices can help by avoiding holding the same information in two places that must be kept synchronized. In this case, we can make a simple but fragile implementation (in Java) in an initial prototype, by giving Delivery History a List object containing Handling Events. But at some point we’ll probably want to drop the collection in favor of a database lookup with Cargo as the key. This discussion will be taken up again when choosing REPOSITORIES. If the query to see the history is relatively infrequent, this should give good performance, simplify maintenance, and reduce the overhead of adding Handling Events. If this query is very frequent, then it is better to go ahead and maintain the direct pointer. These design trade-offs balance simplicity of implementation against performance. The model is the same; it contains the cycle and the bidirectional association.

AGGREGATE BOUNDARIES
Customer, Location, and Carrier Movement have their own identities and are shared by many Cargoes, so they must be the roots of their own AGGREGATES, which contain their attributes and possibly other objects below the level of detail of this discussion. Cargo is also an obvious AGGREGATE root, but where to draw the boundary takes some thought.

The Cargo AGGREGATE could sweep in everything that would not exist but for the particular Cargo, which would include the Delivery History, the Delivery Specification, and the Handling Events. This fits for Delivery History. No one would look up a Delivery History directly without wanting the Cargo itself. With no need for direct global access, and with an identity that is really just derived from the Cargo, the Delivery History fits nicely inside Cargo’s boundary, and it does not need to be a root. The Delivery Specification is a VALUE OBJECT, so there are no complications from including it in the Cargo AGGREGATE.

The Handling Event is another matter. Previously we have considered two possible database queries that would search for these: one, to find the Handling Events for a Delivery History as a possible alternative to the collection, would be local within the Cargo AGGREGATE; the other would be used to find all the operations to load and prepare for a particular Carrier Movement. In the second case, it seems that the activity of handling the Cargo has some meaning even when considered apart from the Cargo itself. So the Handling Event should be the root of its own AGGREGATE.

Image
Figure 7.3. AGGREGATE boundaries imposed on the model. (Note: An ENTITY outside a drawn boundary is implied to be the root of its own AGGREGATE.)

SELECTING REPOSITORIES
There are five ENTITIES in the design that are roots of AGGREGATES, so we can limit our consideration to these, since none of the other objects is allowed to have REPOSITORIES.

To decide which of these candidates should actually have a REPOSITORY, we must go back to the application requirements. In order to take a booking through the Booking Application, the user needs to select the Customer(s) playing the various roles (shipper, receiver, and so on). So we need a Customer Repository. We also need to find a Location to specify as the destination for the Cargo, so we create a Location Repository.

The Activity Logging Application needs to allow the user to look up the Carrier Movement that a Cargo is being loaded onto, so we need a Carrier Movement Repository. This user must also tell the system which Cargo has been loaded, so we need a Cargo Repository.

Image
Figure 7.4. REPOSITORIES give access to selected AGGREGATE roots.

For now there is no Handling Event Repository, because we decided to implement the association with Delivery History as a collection in the first iteration, and we have no application requirement to find out what has been loaded onto a Carrier Movement. Either of these reasons could change; if they did, then we would add a REPOSITORY.

WALKING THROUGH SCENARIOS
To cross-check all these decisions, we have to constantly step through scenarios to confirm that we can solve application problems effectively.

Sample Application Feature: Changing the Destination of a Cargo
Occasionally a Customer calls up and says, “Oh no! We said to send our cargo to Hackensack, but we really need it in Hoboken.” We are here to serve, so the system is required to provide for this change.

Delivery Specification is a VALUE OBJECT, so it would be simplest to just to throw it away and get a new one, then use a setter method on Cargo to replace the old one with the new one.

Sample Application Feature: Repeat Business
The users say that repeated bookings from the same Customers tend to be similar, so they want to use old Cargoes as prototypes for new ones. The application will allow them to find a Cargo in the REPOSITORY and then select a command to create a new Cargo based on the selected one. We’ll design this using the PROTOTYPE pattern (Gamma et al. 1995).

Cargo is an ENTITY and is the root of an AGGREGATE. Therefore, it must be copied carefully; we need to consider what should happen to each object or attribute enclosed by its AGGREGATE boundary. Let’s go over each one:

• Delivery History: We should create a new, empty one, because the history of the old one doesn’t apply. This is the usual case with ENTITIES inside the AGGREGATE boundary.

• Customer Roles: We should copy the Map (or other collection) that holds the keyed references to Customers, including the keys, because they are likely to play the same roles in the new shipment. But we have to be careful not to copy the Customer objects themselves. We must end up with references to the same Customer objects as the old Cargo object referenced, because they are ENTITIES outside the AGGREGATE boundary.

• Tracking ID: We must provide a new Tracking ID from the same source as we would when creating a new Cargo from scratch.

Notice that we have copied everything inside the Cargo AGGREGATE boundary, we have made some modifications to the copy, but we have affected nothing outside the AGGREGATE boundary at all.

OBJECT CREATION
FACTORIES and Constructors for Cargo
Even if we have a fancy FACTORY for Cargo, or use another Cargo as the FACTORY, as in the “Repeat Business” scenario, we still have to have a primitive constructor. We would like the constructor to produce an object that fulfills its invariants or at least, in the case of an ENTITY, has its identity intact.

Given these decisions, we might create a FACTORY method on Cargo such as this:

public Cargo copyPrototype(String newTrackingID)

Or we might make a method on a standalone FACTORY such as this:

public Cargo newCargo(Cargo prototype, String newTrackingID)

A standalone FACTORY could also encapsulate the process of obtaining a new (automatically generated) ID for a new Cargo, in which case it would need only one argument:

public Cargo newCargo(Cargo prototype)

The result returned from any of these FACTORIES would be the same: a Cargo with an empty Delivery History, and a null Delivery Specification.

The two-way association between Cargo and Delivery History means that neither Cargo nor Delivery History is complete without pointing to its counterpart, so they must be created together. Remember that Cargo is the root of the AGGREGATE that includes Delivery History. Therefore, we can allow Cargo’s constructor or FACTORY to create a Delivery History. The Delivery History constructor will take a Cargo as an argument. The result would be something like this:

public Cargo(String id) {
    trackingID = id;
    deliveryHistory = new DeliveryHistory(this);
    customerRoles = new HashMap();
}

The result is a new Cargo with a new Delivery History that points back to the Cargo. The Delivery History constructor is used exclusively by its AGGREGATE root, namely Cargo, so that the composition of Cargo is encapsulated.

Adding a Handling Event
Each time the cargo is handled in the real world, some user will enter a Handling Event using the Incident Logging Application.

Every class must have primitive constructors. Because the Handling Event is an ENTITY, all attributes that define its identity must be passed to the constructor. As discussed previously, the Handling Event is uniquely identified by the combination of the ID of its Cargo, the completion time, and the event type. The only other attribute of Handling Event is the association to a Carrier Movement, which some types of Handling Events don’t even have. A basic constructor that creates a valid Handling Event would be:

public HandlingEvent(Cargo c, String eventType, Date timeStamp) {
    handled = c;
    type = eventType;
    completionTime = timeStamp;
}

Nonidentifying attributes of an ENTITY can usually be added later. In this case, all attributes of the Handling Event are going to be set in the initial transaction and never altered (except possibly for correcting a data-entry error), so it could be convenient, and make client code more expressive, to add a simple FACTORY METHOD to Handling Event for each event type, taking all the necessary arguments. For example, a “loading event” does involve a Carrier Movement:

public static HandlingEvent newLoading(
   Cargo c, CarrierMovement loadedOnto, Date timeStamp) {
      HandlingEvent result =
         new HandlingEvent(c, LOADING_EVENT, timeStamp);
      result.setCarrierMovement(loadedOnto);
      return result;
}

The Handling Event in the model is an abstraction that might encapsulate a variety of specialized Handling Event classes, ranging from loading and unloading to sealing, storing, and other activities not related to Carriers. They might be implemented as multiple subclasses or have complicated initialization—or both. By adding FACTORY METHODS to the base class (Handling Event) for each type, instance creation is abstracted, freeing the client from knowledge of the implementation. The FACTORY is responsible for knowing what class was to be instantiated and how it should be initialized.

Unfortunately, the story isn’t quite that simple. The cycle of references, from Cargo to Delivery History to History Event and back to Cargo, complicates instance creation. The Delivery History holds a collection of Handling Events relevant to its Cargo, and the new object must be added to this collection as part of the transaction. If this back-pointer were not created, the objects would be inconsistent.

Image
Figure 7.5. Adding a Handling Event requires inserting it into a Delivery History.

Creation of the back-pointer could be encapsulated in the FACTORY (and kept in the domain layer where it belongs), but now we’ll look at an alternative design that eliminates this awkward interaction altogether.

PAUSE FOR REFACTORING: AN ALTERNATIVE DESIGN OF THE CARGO AGGREGATE
Modeling and design is not a constant forward process. It will grind to a halt unless there is frequent refactoring to take advantage of new insights to improve the model and the design.

By now, there are a couple of cumbersome aspects to this design, although it does work and it does reflect the model. Problems that didn’t seem important when starting the design are beginning to be annoying. Let’s go back to one of them and, with the benefit of hindsight, stack the design deck in our favor.

The need to update Delivery History when adding a Handling Event gets the Cargo AGGREGATE involved in the transaction. If some other user was modifying Cargo at the same time, the Handling Event transaction could fail or be delayed. Entering a Handling Event is an operational activity that needs to be quick and simple, so an important application requirement is the ability to enter Handling Events without contention. This pushes us to consider a different design.

Replacing the Delivery History’s collection of Handling Events with a query would allow Handling Events to be added without raising any integrity issues outside its own AGGREGATE. This change would enable such transactions to complete without interference. If there are a lot of Handling Events being entered and relatively few queries, this design is more efficient. In fact, if a relational database is the underlying technology, a query was probably being used under the covers anyway to emulate the collection. Using a query rather than a collection would also reduce the difficulty of maintaining consistency in the cyclical reference between Cargo and Handling Event.

To take responsibility for the queries, we’ll add a REPOSITORY for Handling Events. The Handling Event Repository will support a query for the Events related to a certain Cargo. In addition, the REPOSITORY can provide queries optimized to answer specific questions efficiently. For example, if a frequent access path is the Delivery History finding the last reported load or unload, in order to infer the current status of the Cargo, a query could be devised to return just that relevant Handling Event. And if we wanted a query to find all Cargoes loaded on a particular Carrier Movement, we could easily add it.

Image
Figure 7.6. Implementing Delivery History’s collection of Handling Events as a query makes insertion of Handling Events simple and free of contention with the Cargo AGGREGATE.

This leaves the Delivery History with no persistent state. At this point, there is no real need to keep it around. We could derive Delivery History itself whenever it is needed to answer some question. We can derive this object because, although the ENTITY will be repeatedly recreated, the association with the same Cargo object maintains the thread of continuity between incarnations.

The circular reference is no longer tricky to create and maintain. The Cargo Factory will be simplified to no longer attach an empty Delivery History to new instances. Database space can be reduced slightly, and the actual number of persistent objects might be reduced considerably, which is a limited resource in some object databases. If the common usage pattern is that the user seldom queries for the status of a Cargo until it arrives, then a lot of unneeded work will be avoided altogether.

On the other hand, if we are using an object database, traversing an association or an explicit collection is probably much faster than a REPOSITORY query. If the access pattern includes frequent listing of the full history, rather than the occasional targeted query of last position, the performance trade-off might favor the explicit collection. And remember that the added feature (“What is on this Carrier Movement?”) hasn’t been requested yet, and may never be, so we don’t want to pay much for that option.

These kinds of alternatives and design trade-offs are everywhere, and I could come up with lots of examples just in this little simplified system. But the important point is that these are degrees of freedom within the same model. By modeling VALUES, ENTITIES, and their AGGREGATES as we have, we have reduced the impact of such design changes. For example, in this case all changes are encapsulated within the Cargo’s AGGREGATE boundary. It also required the addition of the Handling Event Repository, but it did not call for any redesign of the Handling Event itself (although some implementation changes might be involved, depending on the details of the REPOSITORY framework).

MODULES IN THE SHIPPING MODEL
So far we’ve been looking at so few objects that modularity is not an issue. Now let’s look at a little bigger part of a shipping model (though still simplified, of course) to see its organization into MODULES that will affect the model.

Figure 7.7 shows a model neatly partitioned by a hypothetical enthusiastic reader of this book. This diagram is a variation on the infrastructure-driven packaging problem raised in Chapter 5. In this case, the objects have been grouped according to the pattern each follows. The result is that objects that conceptually have little relationship (low cohesion) are crammed together, and associations run willy-nilly between all the MODULES (high coupling). The packages tell a story, but it is not the story of shipping; it is the story of what the developer was reading at the time.

Image
Figure 7.7. These MODULES do not convey domain knowledge.

Partitioning by pattern may seem like an obvious error, but it is not really any less sensible than separating persistent objects from transient ones or any other methodical scheme that is not grounded in the meaning of the objects.

Instead, we should be looking for the cohesive concepts and focusing on what we want to communicate to others on the project. As with smaller scale modeling decisions, there are many ways to do it. Figure 7.8 shows a straightforward one.

Image
Figure 7.8. MODULES based on broad domain concepts

The MODULE names in Figure 7.8 contribute to the team’s language. Our company does shipping for customers so that we can bill them. Our sales and marketing people deal with customers, and make agreements with them. The operations people do the shipping, getting the cargo to its specified destination. The back office takes care of billing, submitting invoices according to the pricing in the customer’s agreement. That’s one story I can tell with this set of MODULES.

This intuitive breakdown could be refined, certainly, in successive iterations, or even replaced entirely, but it is now aiding MODEL-DRIVEN DESIGN and contributing to the UBIQUITOUS LANGUAGE.

INTRODUCING A NEW FEATURE: ALLOCATION CHECKING
Up to this point, we’ve been working off the initial requirements and model. Now the first major new functions are going to be added.

The sales division of the imaginary shipping company uses other software to manage client relationships, sales projections, and so forth. One feature supports yield management by allowing the firm to allocate how much cargo of specific types they will attempt to book based on the type of goods, the origin and destination, or any other factor they may choose that can be entered as a category name. These constitute goals of how much will be sold of each type, so that more profitable types of business will not be crowded out by less profitable cargoes, while at the same time avoiding underbooking (not fully utilizing their shipping capacity) or excessive overbooking (resulting in bumping cargo so often that it hurts customer relationships).

Now they want this feature to be integrated with the booking system. When a booking comes in, they want it checked against these allocations to see if it should be accepted.

The information needed resides in two places, which will have to be queried by the Booking Application so that it can either accept or reject the requested booking. A sketch of the general information flows looks something like this.

Image
Figure 7.9. Our Booking Application must use information from the Sales Management System and from our own domain REPOSITORIES.

Connecting the Two Systems
The Sales Management System was not written with the same model in mind that we are working with here. If the Booking Application interacts with it directly, our application will have to accommodate the other system’s design, which will make it harder to keep a clear MODEL-DRIVEN DESIGN and will confuse the UBIQUITOUS LANGUAGE. Instead, let’s create another class whose job it will be to translate between our model and the language of the Sales Management System. It will not be a general translation mechanism. It will expose just the features our application needs, and it will reabstract them in terms of our domain model. This class will act as an ANTICORRUPTION LAYER (discussed in Chapter 14).

This is an interface to the Sales Management System, so we might first think of calling it something like “Sales Management Interface.” But we would be missing an opportunity to use language to recast the problem along lines more useful to us. Instead, let’s define a SERVICE for each of the allocation functions we need to get from the other system. We’ll implement the SERVICES with a class whose name reflects its responsibility in our system: “Allocation Checker.”

If some other integration is needed (for example, using the Sales Management System’s customer database instead of our own Customer REPOSITORY), another translator can be created with SERVICES fulfilling that responsibility. It might still be useful to have a lower level class like Sales Management System Interface to handle the machinery of talking to the other program, but it wouldn’t be responsible for translation. Also, it would be hidden behind the Allocation Checker, so it wouldn’t show up in the domain design.

Enhancing the Model: Segmenting the Business
Now that we have outlined the interaction of the two systems, what kind of interface are we going to supply that can answer the question “How much of this type of Cargo may be booked?” The tricky issue is to define what the “type” of a Cargo is, because our domain model does not categorize Cargoes yet. In the Sales Management System, Cargo types are just a set of category keywords, and we could conform our types to that list. We could pass in a collection of strings as an argument. But we would be passing up another opportunity: this time, to reabstract the domain of the other system. We need to enrich our domain model to accommodate the knowledge that there are categories of cargo. We should brainstorm with a domain expert to work out the new concept.

Sometimes (as will be discussed in Chapter 11) an analysis pattern can give us an idea for a modeling solution. The book Analysis Patterns (Fowler 1996) describes a pattern that addresses this kind of problem: the ENTERPRISE SEGMENT. An ENTERPRISE SEGMENT is a set of dimensions that define a way of breaking down a business. These dimensions could include all those mentioned already for the shipping business, as well as time dimensions, such as month to date. Using this concept in our model of allocation makes the model more expressive and simplifies the interfaces. A class called “Enterprise Segment” will appear in our domain model and design as an additional VALUE OBJECT, which will have to be derived for each Cargo.

Image
Figure 7.10. The Allocation Checker acts as an ANTICORRUPTION LAYER presenting a selective interface to the Sales Management System in terms of our domain model.

The Allocation Checker will translate between Enterprise Segments and the category names of the external system. The Cargo Repository must also provide a query based on the Enterprise Segment. In both cases, collaboration with the Enterprise Segment object can be used to perform the operations without breaching the Segment’s encapsulation and complicating their own implementations. (Notice that the Cargo Repository is answering a query with a count, rather than a collection of instances.)

There are still a few problems with this design.

1. We have given the Booking Application the job of applying this rule: “A Cargo is accepted if the space allocated for its Enterprise Segment is greater than the quantity already booked plus the size of the new Cargo.” Enforcing a business rule is domain responsibility and shouldn’t be performed in the application layer.

2. It isn’t clear how the Booking Application derives the Enterprise Segment.

Both of these responsibilities seem to belong to the Allocation Checker. Changing its interface can separate these two SERVICES and make the interaction clear and explicit.

Image
Figure 7.11. Domain responsibilities shifted from Booking Application to Allocation Checker

The only serious constraint imposed by this integration will be that the Sales Management System mustn’t use dimensions that the Allocation Checker can’t turn into Enterprise Segments. (Without applying the ENTERPRISE SEGMENT pattern, the same constraint would force the sales system to use only dimensions that can be used in a query to the Cargo Repository. This approach is feasible, but the sales system spills into other parts of the domain. In this design, the Cargo Repository need only be designed to handle Enterprise Segment, and changes in the sales system ripple only as far as the Allocation Checker, which was conceived as a FACADE in the first place.)

Performance Tuning
Although the Allocation Checker’s interface is the only part that concerns the rest of the domain design, its internal implementation can present opportunities to solve performance problems, if they arise. For example, if the Sales Management System is running on another server, perhaps at another location, the communications overhead could be significant, and there are two message exchanges for each allocation check. There is no alternative to the second message, which invokes the Sales Management System to answer the basic question of whether a certain cargo should be accepted. But the first message, which derives the Enterprise Segment for a cargo, is based on relatively static data and behavior compared to the allocation decisions themselves. One design option would be to cache this information so that it could be relocated on the server with the Allocation Checker, reducing messaging overhead by half. There is a price for this flexibility. The design is more complicated and the duplicated data must now be kept up to date somehow. But when performance is critical in a distributed system, flexible deployment can be an important design goal.

A FINAL LOOK
That’s it. This integration could have turned our simple, conceptually consistent design into a tangled mess, but now, using an ANTICORRUPTION LAYER, a SERVICE, and some ENTERPRISE SEGMENTS, we have integrated the functionality of the Sales Management System into our booking system cleanly, enriching the domain.

A final design question: Why not give Cargo the responsibility of deriving the Enterprise Segment? At first glance it seems elegant, if all the data the derivation is based on is in the Cargo, to make it a derived attribute of Cargo. Unfortunately, it is not that simple. Enterprise Segments are defined arbitrarily to divide along lines useful for business strategy. The same ENTITIES could be segmented differently for different purposes. We are deriving the segment for a particular Cargo for booking allocation purposes, but it could have a completely different Enterprise Segment for tax accounting purposes. Even the allocation Enterprise Segment could change if the Sales Management System is reconfigured because of a new sales strategy. So the Cargo would have to know about the Allocation Checker, which is well outside its conceptual responsibility, and it would be laden with methods for deriving specific types of Enterprise Segment. Therefore, the responsibility for deriving this value lies properly with the object that knows the rules for segmentation, rather than the object that has the data to which those rules apply. Those rules could be split out into a separate “Strategy” object, which could be passed to a Cargo to allow it to derive an Enterprise Segment. That solution seems to go beyond the requirements we have here, but it would be an option for a later design and shouldn’t be a very disruptive change.
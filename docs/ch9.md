# 第 9 章 将隐式概念转变为显式概念

> Nine. Making Implicit Concepts Explicit

Deep modeling sounds great, but how do you actually do it? A deep model has power because it contains the central concepts and abstractions that can succinctly and flexibly express essential knowledge of the users’ activities, their problems, and their solutions. The first step is to somehow represent the essential concepts of the domain in the model. Refinement comes later, after successive iterations of knowledge crunching and refactoring. But this process really gets into gear when an important concept is recognized and made explicit in the model and design.

Many transformations of domain models and the corresponding code happen when developers recognize a concept that has been hinted at in discussion or present implicitly in the design, and they then represent it explicitly in the model with one or more objects or relationships.

Occasionally, this transformation of a formerly implicit concept into an explicit one is a breakthrough that leads to a deep model. More often, though, the breakthrough comes later, after a number of important concepts are explicit in the model; after successive refactorings have tweaked their responsibilities repeatedly, changed their relationships with other objects, and even changed their names a few times. Everything finally snaps into focus. But the process starts with recognizing the implied concepts in some form, however crude.

DIGGING OUT CONCEPTS
Developers have to sensitize themselves to the hints that reveal lurking implicit concepts, and sometimes they have to proactively search them out. Most such discoveries come from listening to the language of the team, scrutinizing awkwardness in the design and seeming contradictions in the statements of experts, mining the literature of the domain, and doing lots and lots of experimentation.

Listen to Language
You may remember an experience like this: The users have always talked about some item on a report. The item is compiled from attributes of various objects and maybe even a direct database query. The same data set is assembled in another part of the application in order to present or report or derive something. But you have never seen the need for an object. Probably, you have never really understood what the users meant by a particular term and had not realized it was important.

Then suddenly a light comes on in your head. The name of the item on that report designates an important domain concept. You talk excitedly with your experts about your new insight. Maybe they show relief that you finally got it. Maybe they yawn because they’ve taken it for granted all along. Either way, you start to draw model diagrams on the board that fill in for some hand waving that you’ve always done before. The users correct you on the details of how the new model connects, but you can tell that there is a change in the quality of the discussion. You and the users understand each other more precisely, and demonstrations of model interactions to solve specific scenarios have become more natural. The language of the domain model has become more powerful. You refactor the code to reflect the new model and find you have a cleaner design.

Listen to the language the domain experts use. Are there terms that succinctly state something complicated? Are they correcting your word choice (perhaps diplomatically)? Do the puzzled looks on their faces go away when you use a particular phrase? These are hints of a concept that might benefit the model.

This is not the old “nouns are objects” notion. Hearing a new word produces a lead, which you follow up with conversation and knowledge crunching, with the goal of carving out a clean, useful concept. When the users or domain experts use vocabulary that is nowhere in the design, that is a warning sign. It is a doubly strong warning when both the developers and the domain experts are using terms that are not in the design.

Or perhaps it is better to look at it as an opportunity. The UBIQUITOUS LANGUAGE is made up of the vocabulary that pervades speech, documents, model diagrams, and even code. If a term is absent from the design, it is an opportunity to improve the model and design by including it.

Example: Hearing a Missing Concept in the Shipping Model
The team had already developed a working application that could book a cargo. They were starting to build an “operations support” application that would help juggle the work orders for loading and unloading cargos at the origin and destination and at transfers between ships.

The booking application used a routing engine to plan the trip for a cargo. Each leg of the journey was stored in a row of a database table, indicating the ID of the vessel voyage (a particular voyage by a particular ship) slated to carry the cargo, the location where it would be loaded, and the location where it would be unloaded.

Image
Figure 9.1

Let’s eavesdrop on a conversation (heavily abbreviated) between the developer and a shipping expert.

Developer: I want to make sure the “cargo bookings” table has all the data that the operations application will need.

Expert: They’re going to need the whole itinerary for the Cargo. What information does it have now?

Developer: The cargo ID, the vessel voyage, the loading port, and the unloading port for each leg.

Expert: What about the date? Operations will need to contract handling work based on the expected times.

Developer: Well, that can be derived from the schedule of the vessel voyage. The table data is normalized.

Expert: Yes, it is normal to need the date. Operations people use these kinds of itineraries to plan for upcoming handling work.

Developer: Yeah . . . OK, they’ll definitely have access to the dates. The operations management application will be able to provide the whole loading and unloading sequence, with the date of each handling operation. The “itinerary,” I guess you would say.

Expert: Good. The itinerary is the main thing they’ll need. Actually, you know, the booking application has a menu item that will print an itinerary or e-mail it to the customer. Can you use that somehow?

Developer: That’s just a report, I think. We won’t be able to base the operations application on that.

[Developer looks thoughtful, then excited.]

Developer: So, this itinerary is really the link between booking and operations.

Expert: Yes, and some customer relations, too.

Developer: [Sketching a diagram on the whiteboard.] So would you say it is something like this?

Image
Figure 9.2

Expert: Yes, that looks basically right. For each leg you’d like to see the vessel voyage, the load and unload location, and time.

Developer: So once we create the Leg object, it can derive the times from the vessel voyage schedule. We can make the Itinerary object our main point of contact with the operations application. And we can rewrite that itinerary report to use this, so we’ll get the domain logic back into the domain layer.

Expert: I didn’t follow all of that, but you are right that the two main uses for the Itinerary are in the report in booking and in the operations application.

Developer: Hey! We can make the Routing Service interface return an itinerary object instead of putting the data in the database table. That way the routing engine doesn’t need to know about our tables.

Expert: Huh?

Developer: I mean, I’ll make the routing engine just return an Itinerary. Then it can be saved in the database by the booking application when the rest of the booking is saved.

Expert: You mean it isn’t that way now?!

The developer then went off to talk with the other developers involved in the routing process. They hashed out the changes to the model and the implications for the design, calling on the shipping experts when needed. They came up with the diagram in Figure 9.3.

Image
Figure 9.3

Next, the developers refactored the code to reflect the new model. They did it in a series of two or three refactorings, but in quick succession, within a week, except for simplifying the itinerary report in the booking application, which they took care of early the following week.

The developer had been listening closely enough to the shipping expert to notice how important the concept of an “itinerary” was to him. True, all the data was already being collected, and the behavior was implicit in the itinerary report, but the explicit Itinerary as part of the model opened up opportunities.

Benefits of refactoring to the explicit Itinerary object:

1. Defining the interface of the Routing Service more expressively

2. Decoupling the Routing Service from the booking database tables

3. Clarifying the relationship between the booking application and the operations support application (the sharing of the Itinerary object)

4. Reducing duplication, because the Itinerary derives loading/unloading times for both the booking report and the operations support application

5. Removing domain logic from the booking report and placing it in the isolated domain layer

6. Expanding the UBIQUITOUS LANGUAGE, allowing a more precise discussion of the model and design between developers and domain experts and among the developers themselves

Scrutinize Awkwardness
The concept you need is not always floating on the surface, emerging in conversation or documents. You may have to dig and invent. The place to dig is the most awkward part of your design. The place where procedures are doing complicated things that are hard to explain. The place where every new requirement seems to add complexity.

Sometimes it can be hard to recognize that there even is a missing concept. You may have objects doing all the work but find some of the responsibilities awkward. Or, if you do realize something is missing, a model solution may elude you.

Now you have to actively engage the domain experts in the search. If you are lucky, they may enjoy playing with ideas and experimenting with the model. If you are not that lucky, you and your fellow developers will have to come up with the ideas, using the domain expert as a validator, watching for discomfort or recognition on his or her face.

Example: Earning Interest the Hard Way
The next story is set in a hypothetical financial company that invests in commercial loans and other interest-bearing assets. An application that tracks those investments and the earnings from them has been evolving incrementally, feature by feature. Each night, one component was to run as a batch script, calculating all interest and fees for the day and then recording them appropriately in the company’s accounting software.

Image
Figure 9.4. An awkward model

The nightly batch script iterated through each Asset, telling each to calculateInterestForDate() on that day’s date. The script took the return value (the amount earned) and passed this amount, along with the name of a specific ledger, to a SERVICE that provided the public interface of the accounting program. That software posted the amount to the named ledger. The script went through a similar process to get the day’s fees from each Asset, posting them to a different ledger.

A developer had been struggling with the increasing complexity of calculating interest. She started to suspect an opportunity for a model better suited to the task. This developer asked her favorite domain expert to help her dig into the problem area.

Developer: Our Interest Calculator is getting out of hand.

Expert: That is a complicated part. We still have more cases we’ve been holding back.

Developer: I know. We can add new interest types by substituting a different Interest Calculator. But what we’re having the most trouble with right now is all these special cases when they don’t pay the interest on schedule.

Expert: Those really aren’t special cases. There’s a lot of flexibility in when people pay.

Developer: Back when we factored out the Interest Calculator from the Asset, it helped a lot. We may need to break it up more.

Expert: OK.

Developer: I was thinking you might have a way of talking about this interest calculation.

Expert: What do you mean?

Developer: Well, for example, we’re tracking the interest due but unpaid within an accounting period. Do you have a name for that?

Expert: Well, we don’t really do it like that. The interest earned and the payment are quite separate postings.

Developer: So you don’t need that number?

Expert: Well, sometimes we might look at it, but it isn’t the way we do business.

Developer: OK, so if the payment and interest are separate, maybe we should model them that way. How does this look? [Sketching on whiteboard]

Image
Figure 9.5

Expert: It makes sense, I guess. But you just moved it from one place to another.

Developer: Except now the Interest Calculator only keeps track of interest earned, and the Payment keeps that number separately. It hasn’t simplified it a lot, but does it better reflect your business practice?

Expert: Ah. I see. Could we have interest history, too? Like the Payment History.

Developer: Yes, that has been requested as a new feature. But that could have been added onto the original design.

Expert: Oh. Well, when I saw interest and Payment History separated like that, I thought you were breaking up the interest to organize it more like the Payment History. Do you know anything about accrual basis accounting?

Developer: Please explain.

Expert: Each day, or whenever the schedule calls for, we have an interest accrual that gets posted to a ledger. The payments are posted a different way. This aggregate you have here is a little awkward.

Developer: You’re saying that if we keep a list of “accruals,” they could be aggregated or . . . “posted” as needed.

Expert: Probably posted on the accrual date, but yes, aggregated anytime. Fees work the same way, posted to a different ledger, of course.

Developer: Actually, the interest calculation would be simpler if it was done just for one day, or period. And then we could just hang on to them all. How about this?

Image
Figure 9.6

Expert: Sure. It looks good. I’m not sure why this would be easier for you. But basically, what makes any asset valuable is what it can accrue in interest, fees, and so on.

Developer: You said fees work the same way? They . . . what was it . . . post to different ledgers?

Image
Figure 9.7

Developer: With this model, we get the interest calculation, or rather, the accrual calculation logic that was in the Interest Calculator separated from tracking. And I hadn’t noticed until now how much duplication there is in the Fee Calculator. Also, now the different kinds of fees can easily be added.

Expert: Yes, the calculation was correct before, but I can see everything now.

Because the Calculator classes hadn’t been directly coupled with other parts of the design, this was a fairly easy refactoring. The developer was able to rewrite the unit tests to use the new language in a few hours and had the new design working late the next day. She ended up with this.

Image
Figure 9.8. A deeper model after refactoring

In the refactored application, the nightly batch script tells each Asset to calculateAccrualsThroughDate(). The return value is a collection of Accruals, each of whose amounts it posts to the indicated ledger.

The new model has several advantages. The change

1. Enriches the UBIQUITOUS LANGUAGE with the term “accrual”

2. Decouples accrual from payment

3. Moves domain knowledge (such as which ledger to post to) from the script and into the domain layer

4. Brings fees and interest together in a way that fits the business and eliminates duplication in the code

5. Provides a straightforward path for adding new variations of fees and interest as Accrual Schedules

This time, the developer had to dig for the new concepts she needed. She could see the awkwardness of the interest calculations and made a committed effort to look for a deeper answer.

She was lucky to have an intelligent and motivated partner in the banking expert. With a more passive source of expertise, she would have made more false starts and depended more on other developers as brainstorming partners. Progress would have been slower, but still possible.

Contemplate Contradictions
Different domain experts see things different ways based on their experience and needs. Even the same person provides information that is logically inconsistent after careful analysis. Such pesky contradictions, which we encounter all the time when digging into program requirements, can be great clues to deeper models. Some are just variations in terminology or are based on misunderstanding. But there is a residue where two factual statements by experts seem to contradict.

The astronomer Galileo once posed a paradox. The evidence of the senses clearly indicates that the Earth is stationary: people are not being blown off and falling behind. Yet Copernicus had made a compelling argument that the Earth was moving around the sun quite rapidly. Reconciling this might reveal something profound about how nature works.

Galileo devised a thought experiment. If a rider dropped a ball from a running horse, where would it fall? Of course, the ball would move along with the horse until it hit the ground by the horse’s feet, just as if the horse were standing still. From this he deduced an early form of the idea of inertial frames of reference, solving the paradox and leading to a much more useful model of the physics of motion.

OK. Our contradictions are usually not so interesting, nor the implications so profound. Even so, this same pattern of thought often helps pierce the superficial layers of a problem domain into a deeper insight.

It is not practical to reconcile all contradictions, and it may not even be desirable. (Chapter 14 delves into how to decide and how to manage the result.) However, even when a contradiction is left in place, contemplation of how two statements could both apply to the same external reality can be revealing.

Read the Book
Don’t overlook the obvious when seeking model concepts. In many fields, you can find books that explain the fundamental concepts and conventional wisdom. You still have to work with your own domain experts to distill the part relevant to your problem and to crunch it into something suited to object-oriented software. But you may be able to start with a coherent, deeply considered view.

Example: Earning Interest by the Book
Let’s imagine a different scenario for the investment-tracking application discussed in the previous example. Just as before, the story starts with the developer realizing that the design is getting unwieldy, particularly the Interest Calculator. But in this scenario, the domain expert’s primary responsibilities lie elsewhere, and he doesn’t have much interest in helping the software development project. In this scenario, the developer couldn’t turn to the expert for a brainstorming session to probe for the missing concepts she suspected to be lurking under the surface.

Instead, she went to the bookstore. After a little browsing, she found an introductory accounting book she liked, and she skimmed it. She discovered a whole system of well-defined concepts. An excerpt that particularly fired her thinking:

Accrual Basis Accounting. This method recognizes income when it is earned, even if it is not paid. All expenses also show when they are incurred whether they have been paid for or billed to be paid at a later date. Any obligation due, including taxes, will be shown as expense.

—Finance and Accounting: How to Keep Your Books and Manage Your Finances Without an MBA, a CPA or a Ph.D., by Suzanne Caplan (Adams Media, 2000)

The developer no longer needed to reinvent accounting. After some brainstorming with another developer, she came up with a model.

Image
Figure 9.9. A somewhat deeper model based on book learning

She did not have the insight that Assets are income generators, and so the Calculators are still there. The knowledge of ledgers is still in the application, rather than the domain layer where it probably belongs. But she did separate the issue of payment from the accrual of income, which was the most problematic area, and she introduced the word “accrual” into the model and into the UBIQUITOUS LANGUAGE. Further refinement could come with later iterations.

When she did finally have the chance to talk with the domain expert, he was quite surprised. It was the first time a programmer had shown a glimmer of interest in what he did. Due to the way his responsibilities were assigned, the expert never engaged with her, sitting down to go over the model, as happened in the previous scenario. However, because this developer’s knowledge allowed her to ask better questions, from then on the expert did listen to her carefully, and he made a special effort to answer her questions promptly.

Of course, this is not an either-or proposition. Even with ample support from domain experts, it pays to look at the literature to get a grasp of the theory of the field. Most businesses do not have models refined to the level of accounting or finance, but in many there have been thinkers in the field who have organized and abstracted the common practices of the business.

Yet another option the developer had was to read something written by another software professional with development experience in this domain. For example, Chapter 6 of the book Analysis Patterns: Reusable Object Models (Fowler 1997) would have sent her in quite a different direction, not necessarily better or worse. Such reading would not have provided an off-the-shelf solution. It would have given several new starting points for her own experiments, along with the distilled experience of people who have traveled the territory. She would have been spared reinventing the wheel. Chapter 11, “Applying Analysis Patterns,” will delve further into this option.

Try, Try Again
The examples I’ve given don’t convey the amount of trial and error involved. I might follow half a dozen leads in conversation before finding one that seems clear and useful enough to try out in the model. I’ll end up replacing that one at least once later, as additional experience and knowledge crunching serve up better ideas. A modeler/designer cannot afford to get attached to his own ideas.

All these changes of direction are not just thrashing. Each change embeds deeper insight into the model. Each refactoring leaves the design more supple, easier to change the next time, ready to bend in the places that turn out to need to bend.

There really is no choice, anyway. Experimentation is the way to learn what works and doesn’t. Trying to avoid missteps in design will result in a lower quality result because it will be based on less experience. And it can easily take longer than a series of quick experiments.

HOW TO MODEL LESS OBVIOUS KINDS OF CONCEPTS
The object-oriented paradigm leads us to look for and invent certain kinds of concepts. Things, even very abstract ones such as “accruals,” are the meat of most object models, along with the actions those things take. These are the “nouns and verbs” that introductory object-oriented design books talk about. But other important categories of concepts can be made explicit in a model as well.

I’ll discuss three such categories that were not obvious to me when I started with objects. My designs became sharper with each one of these I learned.

Explicit Constraints
Constraints make up a particularly important category of model concepts. They often emerge implicitly, and expressing them explicitly can greatly improve a design.

Sometimes constraints find a natural home in an object or method. A “Bucket” object must guarantee the invariant that it does not hold more than its capacity.

Image
Figure 9.10

A simple invariant like this can be enforced using case logic in each operation capable of changing contents.

class Bucket {
   private float capacity;
   private float contents;

   public void pourIn(float addedVolume) {
      if (contents + addedVolume > capacity) {
         contents = capacity;
      } else {
         contents = contents + addedVolume;
      }
   }
}

This logic is so simple that the rule is obvious. But you can easily imagine this constraint getting lost in a more complicated class. Let’s factor it into a separate method, with a name that clearly and explicitly expresses the significance of the constraint.

class Bucket {
   private float capacity;
   private float contents;
   public void pourIn(float addedVolume) {
      float volumePresent = contents + addedVolume;
      contents = constrainedToCapacity(volumePresent);
   }

   private float constrainedToCapacity(float volumePlacedIn) {
      if (volumePlacedIn > capacity) return capacity;
      return volumePlacedIn;
   }
}

Both versions of this code enforce the constraint, but the second has a more obvious relationship to the model (the basic requirement of MODEL-DRIVEN DESIGN). This very simple rule was understandable in its original form, but when the rules being enforced are more complex, they start to overwhelm the object or operation they apply to, as any implicit concept does. Factoring the constraint into its own method allows us to give it an intention-revealing name that makes the constraint explicit in our design. It is now a named thing we can discuss. This approach also gives the constraint room. A more complex rule than this might easily produce a method longer than its caller (the pourIn() method, in this case). This way, the caller stays simple and focused on its task while the constraint can grow in complexity if need be.

This separate method gives the constraint some room to grow, but there are lots of cases when a constraint just can’t fit comfortably in a single method. Or even if the method stays simple, it may call on information that the object doesn’t need for its primary responsibility. The rule may just have no good home in an existing object.

Here are some warning signs that a constraint is distorting the design of its host object.

1. Evaluating a constraint requires data that does not otherwise fit the object’s definition.

2. Related rules appear in multiple objects, forcing duplication or inheritance between objects that are not otherwise a family.

3. A lot of design and requirements conversation revolves around the constraints, but in the implementation, they are hidden away in procedural code.

When the constraints are obscuring the object’s basic responsibility, or when the constraint is prominent in the domain yet not prominent in the model, you can factor it out into an explicit object or even model it as a set of objects and relationships. (One in-depth, semiformal treatment of this subject can be found in The Object Constraint Language: Precise Modeling with UML [Warmer and Kleppe 1999].)

Example: Review: Overbooking Policy
In Chapter 1, we worked with a common shipping business practice: booking 10 percent more cargo than the transports could handle. (Experience has taught shipping firms that this overbooking compensates for last-minute cancellations, so their ships will sail nearly full.)

This constraint on the association between Voyage and Cargo was made explicit, both in the diagrams and in the code, by adding a new class that represented the constraint.

Image
Figure 9.11. The model refactored to make policy explicit

To review the code and reasoning in the full example, see page 17.

Processes as Domain Objects
Right up front, let’s agree that we do not want to make procedures a prominent aspect of our model. Objects are meant to encapsulate the procedures and let us think about their goals or intentions instead.

What I am talking about here are processes that exist in the domain, which we have to represent in the model. When these emerge, they tend to make for awkward object designs.

The first example in this chapter described a shipping system that routed cargo. This routing process was something with business meaning. A SERVICE is one way of expressing such a process explicitly, while still encapsulating the extremely complex algorithms.

When there is more than one way to carry out a process, another approach is to make the algorithm itself, or some key part of it, an object in its own right. The choice between processes becomes a choice between these objects, each of which represents a different STRATEGY. (Chapter 12 will look in more detail at the use of STRATEGIES in the domain.)

The key to distinguishing a process that ought to be made explicit from one that should be hidden is simple: Is this something the domain experts talk about, or is it just part of the mechanism of the computer program?

Constraints and processes are two broad categories of model concepts that don’t come leaping to mind when programming in an object-oriented language, yet they can really sharpen up a design once we start thinking about them as model elements.

Some useful categories of concepts are much narrower. I’ll round out this chapter with one much more specific, yet quite common. SPECIFICATION provides a concise way of expressing certain kinds of rules, extricating them from conditional logic and making them explicit in the model.

I developed SPECIFICATION in collaboration with Martin Fowler (Evans and Fowler 1997). The simplicity of the concept belies the subtlety in application and implementation, so there is a lot of detail in this section. There will be even more discussion in Chapter 10, where the pattern is extended. After reading the initial explanation of the pattern that follows, you may want to skim the “Applying and Implementing SPECIFICATIONS” section, until you are actually attempting to apply the pattern.

Specification
Image
In all kinds of applications, Boolean test methods appear that are really parts of little rules. As long as they are simple, we handle them with testing methods, such as anIterator.hasNext() or anInvoice.isOverdue(). In an Invoice class, the code in isOverdue() is an algorithm that evaluates a rule. For example,

public boolean isOverdue() {
   Date currentDate = new Date();
   return currentDate.after(dueDate);
}

But not all rules are so simple. On the same Invoice class, another rule, anInvoice.isDelinquent() would presumably start with testing if the Invoice is overdue, but that would just be the beginning. A policy on grace periods could depend on the status of the customer’s account. Some delinquent invoices will be ready for a second notice, while others will be ready to be sent to a collection agency. The payment history of the customer, company policy on different product lines . . . the clarity of Invoice as a request for payment will soon be lost in the sheer mass of rule evaluation code. The Invoice will also develop all sorts of dependencies on domain classes and subsystems that do not support that basic meaning.

At this point, in an attempt to save the Invoice class, a developer will often refractor the rule evaluation code into the application layer (in this case, a bill collection application). Now the rules have been separated from the domain layer altogether, leaving behind a dead data object that does not express the rules inherent in the business model. These rules need to stay in the domain layer, but they don’t fit into the object being evaluated (the Invoice in this case). Not only that, but evaluating methods swell with conditional code, which make the rule hard to read.

Developers working in the logic-programming paradigm would handle this situation differently. Such rules would be expressed as predicates. Predicates are functions that evaluate to “true” or “false” and can be combined using operators such as “AND” and “OR” to express more complex rules. With predicates, we could declare rules explicitly and use them with the Invoice. If only we were in the logic paradigm.

Seeing this, people have made attempts at implementing logical rules in terms of objects. Some such attempts were very sophisticated, others naive. Some were ambitious, others modest. Some turned out valuable, some were tossed aside as failed experiments. A few attempts were allowed to derail their projects. One thing is clear: As appealing as the idea is, full implementation of logic in objects is a major undertaking. (After all, logic programming is a whole modeling and design paradigm in its own right.)

Business rules often do not fit the responsibility of any of the obvious ENTITIES or VALUE OBJECTS, and their variety and combinations can overwhelm the basic meaning of the domain object. But moving the rules out of the domain layer is even worse, since the domain code no longer expresses the model.

Logic programming provides the concept of separate, combinable, rule objects called “predicates,” but full implementation of this concept with objects is cumbersome. It is also so general that it doesn’t communicate intent as much as more specialized designs.

Fortunately, we don’t really need to fully implement logic programming to get a large benefit. Most of our rules fall into a few special cases. We can borrow the concept of predicates and create specialized objects that evaluate to a Boolean. Those testing methods that get out of hand will neatly expand into objects of their own. They are little truth tests that can be factored out into a separate VALUE OBJECT. This new object can evaluate another object to see if the predicate is true for that object.

Image
Figure 9.12

To put it another way, the new object is a specification. A SPECIFICATION states a constraint on the state of another object, which may or may not be present. It has multiple uses, but one that conveys the most basic concept is that a SPECIFICATION can test any object to see if it satisfies the specified criteria.

Therefore:

Create explicit predicate-like VALUE OBJECTS for specialized purposes. A SPECIFICATION is a predicate that determines if an object does or does not satisfy some criteria.

Many SPECIFICATIONS are simple, special-purpose tests, as in the delinquent invoice example. In cases where the rules are complex, the concept can be extended to allow simple specifications to be combined, just as predicates are combined with logical operators. (This technique will be discussed in the next chapter.) The fundamental pattern stays the same and provides a path from the simpler to more complex models.

The case of the delinquent invoice can be modeled using a SPECIFICATION that states what it means to be delinquent and that can evaluate any Invoice and make the determination.

Image
Figure 9.13. A more elaborate delinquency rule factored out as a SPECIFICATION

The SPECIFICATION keeps the rule in the domain layer. Because the rule is a full-fledged object, the design can be a more explicit reflection of the model. A FACTORY can configure a SPECIFICATION using information from other sources, such as the customer’s account or the corporate policy database. Providing direct access to these sources from the Invoice would couple the objects in a way that does not relate to the request for payment (the basic responsibility of Invoice). In this case, the Delinquent Invoice Specification was to be created, used to evaluate some Invoices, and then discarded, so a specific evaluation date was built right in—a nice simplification. A SPECIFICATION can be given the information it will need to do its job in a simple, straightforward way.

Image Image Image
The basic concept of SPECIFICATION is very simple and helps us think about a domain modeling problem. But a MODEL-DRIVEN DESIGN requires an effective implementation that also expresses the concept. To pull that off requires digging a little deeper into how the pattern will be applied. A domain pattern is not just a neat idea for a UML diagram; it is a solution to a programming problem that retains a MODEL-DRIVEN DESIGN.

When you apply a pattern appropriately, you can tap into a whole body of thought about how to approach a class of domain modeling problem, and you can benefit from years of experience in finding effective implementations. There is a lot of detail in the discussion of SPECIFICATION that follows: many options for features and approaches to implementation. A pattern is not a cookbook. It lets you start from a base of experience to develop your solution, and it gives you some language to talk about what you are doing.

You may want to skim the key concepts when first reading. Later, when you run into the situation, you can come back and draw on the experience captured in the detailed discussion. Then you can go and figure out a solution to your problem.

Applying and Implementing SPECIFICATION
Much of the value of SPECIFICATION is that it unifies application functionality that may seem quite different. We might need to specify the state of an object for one or more of these three purposes.

1. To validate an object to see if it fulfills some need or is ready for some purpose

2. To select an object from a collection (as in the case of querying for overdue invoices)

3. To specify the creation of a new object to fit some need

These three uses—validation, selection, and building to order—are the same on a conceptual level. Without a pattern such as SPECIFICATION, the same rule may show up in different guises, and possibly contradictory forms. The conceptual unity can be lost. Applying the SPECIFICATION pattern allows a consistent model to be used, even when the implementation may have to diverge.

Validation
The simplest use of a SPECIFICATION is validation, and it is the use that demonstrates the concept most straightforwardly.

Image
Figure 9.14. A model applying a SPECIFICATION for validation

class DelinquentInvoiceSpecification extends
      InvoiceSpecification {
   private Date currentDate;
   // An instance is used and discarded on a single date

   public DelinquentInvoiceSpecification(Date currentDate) {
      this.currentDate = currentDate;
}

   public boolean isSatisfiedBy(Invoice candidate) {
      int gracePeriod =
         candidate.customer().getPaymentGracePeriod();
      Date firmDeadline =
         DateUtility.addDaysToDate(candidate.dueDate(),
            gracePeriod);
         return currentDate.after(firmDeadline);
   }

}

Now, suppose we need to display a red flag whenever a salesperson brings up a customer with delinquent bills. We just have to write a method in a client class, something like this.

public boolean accountIsDelinquent(Customer customer) {
   Date today = new Date();
   Specification delinquentSpec =
      new DelinquentInvoiceSpecification(today);
   Iterator it = customer.getInvoices().iterator();
   while (it.hasNext()) {
      Invoice candidate = (Invoice) it.next();
      if (delinquentSpec.isSatisfiedBy(candidate)) return true;
   }
   return false;
}

Selection (or Querying)
Validation tests an individual object to see if it meets some criteria, presumably so that the client can act on the conclusion. Another common need is to select a subset of a collection of objects based on some criteria. The same concept of SPECIFICATION can be applied here, but implementation issues are different.

Suppose there was an application requirement to list all customers with delinquent Invoices. In theory, the Delinquent Invoice Specification that we defined before will still serve, but in practice its implementation would probably have to change. To demonstrate that the concept is the same, let’s assume first that the number of Invoices is small, maybe already in memory. In this case, the straightforward implementation developed for validation still serves. The Invoice Repository could have a generalized method to select Invoices based on a SPECIFICATION:

public Set selectSatisfying(InvoiceSpecification spec) {

   Set results = new HashSet();
   Iterator it = invoices.iterator();
   while (it.hasNext()) {
      Invoice candidate = (Invoice) it.next();
      if (spec.isSatisfiedBy(candidate)) results.add(candidate);
   }

   return results;
}

So a client could obtain a collection of all delinquent Invoices with a single code statement:

Set delinquentInvoices = invoiceRepository.selectSatisfying(
   new DelinquentInvoiceSpecification(currentDate));

That line of code establishes the concept behind the operation. Of course, the Invoice objects probably aren’t in memory. There may be thousands of them. In a typical business system, the data is probably in a relational database. And, as pointed out in earlier chapters, the model focus tends to get lost at these intersections with other technologies.

Relational databases have powerful search capabilities. How can we take advantage of that power to solve this problem efficiently while retaining the model of a SPECIFICATION? MODEL-DRIVEN DESIGN demands that the model stay in lockstep with the implementation, but it allows freedom to choose any implementation that faithfully captures the meaning of the model. Lucky for us, SQL is a very natural way to write SPECIFICATIONS.

Here is a simple example, in which the query is encapsulated in the same class as the validation rule. A single method is added to the Invoice Specification and is implemented in the Delinquent Invoice Specification subclass:

public String asSQL() {
   return
      "SELECT * FROM INVOICE, CUSTOMER" +
      "  WHERE INVOICE.CUST_ID = CUSTOMER.ID" +
      "  AND INVOICE.DUE_DATE + CUSTOMER.GRACE_PERIOD" +
      "     < " + SQLUtility.dateAsSQL(currentDate);
}

SPECIFICATIONS mesh smoothly with REPOSITORIES, which are the building-block mechanisms for providing query access to domain objects and encapsulating the interface to the database (see Figure 9.15).

Image
Figure 9.15. The interaction between REPOSITORY and SPECIFICATION

Now this design has some problems. Most important, the details of the table structure have leaked into the DOMAIN LAYER; they should be isolated in a mapping layer that relates the domain objects to the relational tables. Implicitly duplicating that information here could hurt the modifiability and maintainability of the Invoice and Customer objects, because any change to their mappings now have to be tracked in more than one place. But this example is a simple illustration of how to keep the rule in just one place. Some object-relational mapping frameworks provide the means to express such a query in terms of the model objects and attributes, generating the actual SQL in the infrastructure layer. This would let us have our cake and eat it too.

When the infrastructure doesn’t come to the rescue, we can refactor the SQL out of the expressive domain objects by adding a specialized query method to the Invoice Repository. To avoid embedding the rule into the REPOSITORY, we have to express the query in a more generic way, one that doesn’t capture the rule but can be combined or placed in context to work the rule out (in this example, by using a double dispatch).

public class InvoiceRepository {

   public Set selectWhereGracePeriodPast(Date aDate){
      //This is not a rule, just a specialized query
      String sql = whereGracePeriodPast_SQL(aDate);
      ResultSet queryResultSet =
         SQLDatabaseInterface.instance().executeQuery(sql);
      return buildInvoicesFromResultSet(queryResultSet);
   }

   public String whereGracePeriodPast_SQL(Date aDate) {
      return
         "SELECT * FROM INVOICE, CUSTOMER" +
         "  WHERE INVOICE.CUST_ID = CUSTOMER.ID" +
         "  AND INVOICE.DUE_DATE + CUSTOMER.GRACE_PERIOD" +
         "     < " + SQLUtility.dateAsSQL(aDate);
   }

   public Set selectSatisfying(InvoiceSpecification spec) {
      return spec.satisfyingElementsFrom(this);
   }
}

The asSql() method on Invoice Specification is replaced with satisfyingElementsFrom(InvoiceRepository), which Delinquent Invoice Specification implements as:

public class DelinquentInvoiceSpecification {
   // Basic DelinquentInvoiceSpecification code here

   public Set satisfyingElementsFrom(
                     InvoiceRepository repository) {
      //Delinquency rule is defined as:
      //   "grace period past as of current date"
      return repository.selectWhereGracePeriodPast(currentDate);
   }
}

This puts the SQL in the REPOSITORY, while the SPECIFICATION controls what query should be used. The rules aren’t as neatly collected into the SPECIFICATION, but the essential declaration is there of what constitutes delinquency (that is, past grace period).

The REPOSITORY now has a very specialized query that most likely will be used only in this case. That is acceptable, but depending on the relative numbers of Invoices that are overdue compared to those that are delinquent, an intermediate solution that leaves the REPOSITORY methods more generic may still give good performance, while keeping the SPECIFICATION more self-explanatory.

public class InvoiceRepository {

   public Set selectWhereDueDateIsBefore(Date aDate) {
      String sql = whereDueDateIsBefore_SQL(aDate);
      ResultSet queryResultSet =
         SQLDatabaseInterface.instance().executeQuery(sql);
      return buildInvoicesFromResultSet(queryResultSet);
   }

   public String whereDueDateIsBefore_SQL(Date aDate) {
      return
         "SELECT * FROM INVOICE" +
         "  WHERE INVOICE.DUE_DATE" +
         "     < " + SQLUtility.dateAsSQL(aDate);
   }

   public Set selectSatisfying(InvoiceSpecification spec) {
      return spec.satisfyingElementsFrom(this);
   }
}

public class DelinquentInvoiceSpecification {
   //Basic DelinquentInvoiceSpecification code here

   public Set satisfyingElementsFrom(
                          InvoiceRepository repository) {
      Collection pastDueInvoices =
         repository.selectWhereDueDateIsBefore(currentDate);

      Set delinquentInvoices = new HashSet();
      Iterator it = pastDueInvoices.iterator();
      while (it.hasNext()) {
         Invoice anInvoice = (Invoice) it.next();
         if (this.isSatisfiedBy(anInvoice))
            delinquentInvoices.add(anInvoice);
      }
      return delinquentInvoices;
   }
}

We’ll take a performance hit with this code, because we pull out more Invoices and then have to select from them in memory. Whether this is an acceptable cost for the better factoring of responsibility depends entirely on circumstances. There are many ways to implement the interactions between SPECIFICATIONS and REPOSITORIES, to take advantage of the development platform, while keeping the basic responsibilities in place.

Sometimes, to improve performance, or more likely to tighten security, queries may be implemented on the server as stored procedures. In that case, the SPECIFICATION could carry only the parameters allowed by the stored procedure. For all that, there is no difference in the model between these various implementations. The choice of implementation is free except where specifically constrained by the model. The price comes in a more cumbersome way of writing and maintaining queries.

This discussion barely scratches the surface of the challenges of combining SPECIFICATIONS with databases, and I’ll make no attempt to cover all the considerations that may arise. I just want to give a taste of the kind of choices that have to be made. Mee and Hieatt discuss a few of the technical issues involved in designing REPOSITORIES with SPECIFICATIONS in Fowler 2003.

Building to Order (Generating)
When the Pentagon wants a new fighter jet, officials write a specification. This specification may require that the jet reach Mach 2, that it have a range of 1800 miles, that it cost no more than $50 million, and so on. But however detailed it is, the specification is not a design for a plane, much less a plane. An aerospace engineering company will take the specification and create one or more designs based on it. Competing companies may produce different designs, all of which presumably satisfy the original spec.

Many computer programs generate things, and those things have to be specified. When you place a picture into a word-processing document, the text flows around it. You have specified the location of the picture, and perhaps the style of text flow. The exact placement of the words on the page is then worked out by the word processor in such a way that it meets your specification.

Although it may not be apparent at first, this is the same concept of a SPECIFICATION that was applied to validation and selection. We are specifying criteria for objects that are not yet present. The implementation will be quite different, however. This SPECIFICATION is not a filter for preexisting objects, as with querying. It is not a test for an existing object, as with validation. This time, a whole new object or set of objects will be made or reconfigured to satisfy the SPECIFICATION.

Without using SPECIFICATION, a generator can be written that has procedures or a set of instructions that create the needed objects. This code implicitly defines the behavior of the generator.

Instead, an interface of the generator that is defined in terms of a descriptive SPECIFICATION explicitly constrains the generator’s products. This approach has several advantages.

• The generator’s implementation is decoupled from its interface. The SPECIFICATION declares the requirements for the output but does not define how that result is reached.

• The interface communicates its rules explicitly, so developers can know what to expect from the generator without understanding all details of its operation. The only way to predict the behavior of a procedurally defined generator is to run cases or to understand every line of code.

• The interface is more flexible, or can be enhanced with more flexibility, because the statement of the request is in the hands of the client, while the generator is only obligated to fulfill the letter of the SPECIFICATION.

• Last, but not least, this kind of interface is easier to test, because the model contains an explicit way to define input into the generator that is also a validation of the output. That is, the same SPECIFICATION that is passed into the generator’s interface to constrain the creation process can also be used, in its validation role (if the implementation supports it) to confirm that the created object is correct. (This is an example of an ASSERTION, discussed in Chapter 10.)

Building to order can mean creation of an object from scratch, but it can also be a configuration of preexisting objects to satisfy the SPEC.

Example: Chemical Warehouse Packer
There is a warehouse in which various chemicals are stored in stacks of large containers, similar to boxcars. Some chemicals are inert and can be stored just about anywhere. Some are volatile and have to be stored in specially ventilated containers. Some are explosive and have to be stored in specially armored containers. There are also rules about the combinations allowed in a container.

The goal is to write software that will find an efficient and safe way to put the chemicals in the containers.

Image
Figure 9.16. A model for warehouse storage

We could start by writing a procedure to take a chemical and place it in a container, but instead, let’s start with the validation problem. This will force us to make the rules explicit, and it will give us a way to test the final implementation.

Each chemical will have a container SPECIFICATION:

Image
Now, if we write these as Container Specifications, we should be able to take a configuration of packed containers and test to see if it meets these constraints.

Image
A method on Container Specification, isSatisfied(), would have to be implemented to check for needed ContainerFeatures. For example, the SPEC attached to an explosive chemical would look for the “armored” feature:

public class ContainerSpecification {
   private ContainerFeature requiredFeature;
   public ContainerSpecification(ContainerFeature required) {
      requiredFeature = required;
   }

   boolean isSatisfiedBy(Container aContainer){
      return aContainer.getFeatures().contains(requiredFeature);
   }
}

Here is sample client code to set up an explosive chemical:

tnt.setContainerSpecification(
      new ContainerSpecification(ARMORED));

A method on a Container object, isSafelyPacked(), will confirm that Container has all the features specified by the Chemicals it contains:

boolean isSafelyPacked(){
   Iterator it = contents.iterator();
   while (it.hasNext()) {
      Drum drum = (Drum) it.next();
      if (!drum.containerSpecification().isSatisfiedBy(this))
         return false;
   }
   return true;
}

At this point, we could write a monitoring application that would take the inventory database and report any unsafe situations.

Iterator it = containers.iterator();
while (it.hasNext()) {
   Container container = (Container) it.next();
   if (!container.isSafelyPacked())
      unsafeContainers.add(container);
}

This is not the software we’ve been asked to write. It would be good to let the business people know about the opportunity, but we have been charged with designing a packer. What we have is a test for a packer. This understanding of the domain and our SPECIFICATION-based model put us in a position to define a clear and simple interface for a SERVICE that will take collections of Drums and Containers and pack them in compliance with the rules.

public interface WarehousePacker {
   public void pack(Collection containersToFill,
      Collection drumsToPack) throws NoAnswerFoundException;

      /* ASSERTION: At end of pack(), the ContainerSpecification
      of each Drum shall be satisfied by its Container.
      If no complete solution can be found, an exception shall
      be thrown. */

}

Now the task of designing an optimized constraint solver to fulfill the responsibilities of the Packer service has been decoupled from the rest of the application, and those mechanisms will not clutter the part of the design that expresses the model. (See “Declarative Style of Design,” Chapter 10, and COHESIVE MECHANISM, Chapter 15.) Yet the rules governing packing have not been pulled out of the domain objects.

Example: A Working Prototype of the Warehouse Packer
Writing the optimization logic to make the warehouse packing software work is a big job. A small team of developers and business experts have split off and have set to work on it, but they haven’t even begun to code. Meanwhile, another small team is developing the application that will allow users to pull inventory from the database, feed it to the Packer, and interpret the results. They are trying to design for the anticipated Packer. But all they can do is mock up a UI and work on some database integration code. They can’t show the users an interface with meaningful behavior to get good feedback. For the same reason, the Packer team is working in a vacuum too.

With the domain objects and SERVICE interface made in the warehouse packer example, the application team realizes they could build a very simple implementation of a Packer that could help the development process move along, allowing work to go forward in parallel and closing the feedback loop, which only reaches full effect with a working end-to-end system.

public class Container {
   private double capacity;
   private Set contents; //Drums

   public boolean hasSpaceFor(Drum aDrum) {
      return remainingSpace() >= aDrum.getSize();
   }

   public double remainingSpace() {
      double totalContentSize = 0.0;
      Iterator it = contents.iterator();
      while (it.hasNext()) {
         Drum aDrum = (Drum) it.next();
         totalContentSize = totalContentSize + aDrum.getSize();
      }
      return capacity – totalContentSize;
   }

   public boolean canAccommodate(Drum aDrum) {
      return hasSpaceFor(aDrum) &&
         aDrum.getContainerSpecification().isSatisfiedBy(this);
   }

}


public class PrototypePacker implements WarehousePacker {

   public void pack(Collection containers, Collection drums)
                                throws NoAnswerFoundException {

      /* This method fulfills the ASSERTION as written. However,
         when an exception is thrown, Containers' contents may
         have changed. Rollback must be handled at a higher
         level. */

      Iterator it = drums.iterator();
      while (it.hasNext()) {
         Drum drum = (Drum) it.next();
         Container container =
            findContainerFor(containers, drum);
         container.add(drum);
      }
   }
   public Container findContainerFor(
                 Collection containers, Drum drum)
                 throws NoAnswerFoundException {
      Iterator it = containers.iterator();
      while (it.hasNext()) {
         Container container = (Container) it.next();
         if (container.canAccommodate(drum))
            return container;
      }
      throw new NoAnswerFoundException();
   }

}

Granted that this code leaves a lot to be desired. It might pack sand into specialty containers and then run out of room before it packs the hazardous chemicals. It certainly doesn’t optimize revenues. But a lot of optimization problems are never solved perfectly anyway. This implementation does follow the rules that have been stated so far.

Clearing Development Logjams with Working Prototypes

One team has to wait for working code from another in order to move forward. Both teams have to wait for full integration to exercise their components or get feedback from users. This kind of congestion can often be eased by a MODEL-DRIVEN prototype of a key component, even if it does not satisfy all requirements. When implementation is decoupled from interface, then having any working implementation at all allows flexibility for project work to go in parallel. When the time is right, the prototype can be replaced by a more effective implementation. In the meantime, all other parts of the system have something to interact with during development.

Having this prototype lets the application developers move at full speed, including all integrations with external systems. The Packer development team also gets feedback as domain experts interact with the prototype and firm up their ideas, helping clarify requirements and priorities. The Packer team decides to take over the prototype and tweak it to test ideas.

They also keep the interface up-to-date with their latest design, forcing refactoring of the application, and some domain objects, thereby tackling the integration problems early.

As soon as the sophisticated Packer is ready, integration is a breeze because it has been written to a well-characterized interface—the same interface and ASSERTIONS that the application was written for when interacting with the prototype.

It took specialists in optimization algorithms months to get it right. They benefited from the feedback they could get from users interacting with the prototype. In the meantime, all other parts of the system have something to interact with during development.

Here we have an example of a “simplest thing that could possibly work” that actually becomes possible because of a more sophisticated model. We can have a functioning prototype of a very complex component in a couple dozen lines of easily understood code. A less MODEL-DRIVEN approach would be harder to understand, would be harder to upgrade (because the Packer would be more coupled to the rest of the design), and in this case, would likely take longer to prototype.
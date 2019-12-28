# Two. Communication and the Use of Language
A domain model can be the core of a common language for a software project. The model is a set of concepts built up in the heads of people on the project, with terms and relationships that reflect domain insight. These terms and interrelationships provide the semantics of a language that is tailored to the domain while being precise enough for technical development. This is a crucial cord that weaves the model into development activity and binds it with the code.

This model-based communication is not limited to diagrams in Unified Modeling Language (UML). To make most effective use of a model, it needs to pervade every medium of communication. It increases the utility of written text documents, as well as the informal diagrams and casual conversation reemphasized in Agile processes. It improves communication through the code itself and through the tests for that code.

The use of language on a project is subtle but all-important. . . .

UBIQUITOUS LANGUAGE
For first you write a sentence,
And then you chop it small;
Then mix the bits, and sort them out
Just as they chance to fall:
The order of the phrases makes
No difference at all.

—Lewis Carroll, “Poeta Fit, Non Nascitur”

To create a supple, knowledge-rich design calls for a versatile, shared team language, and a lively experimentation with language that seldom happens on software projects.

Image Image Image
Domain experts have limited understanding of the technical jargon of software development, but they use the jargon of their field—probably in various flavors. Developers, on the other hand, may understand and discuss the system in descriptive, functional terms, devoid of the meaning carried by the experts’ language. Or developers may create abstractions that support their design but are not understood by the domain experts. Developers working on different parts of the problem work out their own design concepts and ways of describing the domain.

Across this linguistic divide, the domain experts vaguely describe what they want. Developers, struggling to understand a domain new to them, vaguely understand. A few members of the team manage to become bilingual, but they become bottlenecks of information flow, and their translations are inexact.

On a project without a common language, developers have to translate for domain experts. Domain experts translate between developers and still other domain experts. Developers even translate for each other. Translation muddles model concepts, which leads to destructive refactoring of code. The indirectness of communication conceals the formation of schisms—different team members use terms differently but don’t realize it. This leads to unreliable software that doesn’t fit together (see Chapter 14). The effort of translation prevents the interplay of knowledge and ideas that lead to deep model insights.

A project faces serious problems when its language is fractured. Domain experts use their jargon while technical team members have their own language tuned for discussing the domain in terms of design.

The terminology of day-to-day discussions is disconnected from the terminology embedded in the code (ultimately the most important product of a software project). And even the same person uses different language in speech and in writing, so that the most incisive expressions of the domain often emerge in a transient form that is never captured in the code or even in writing.

Translation blunts communication and makes knowledge crunching anemic.

Yet none of these dialects can be a common language because none serves all needs.

The overhead cost of all the translation, plus the risk of misunderstanding, is just too high. A project needs a common language that is more robust than the lowest common denominator. With a conscious effort by the team, the domain model can provide the backbone for that common language, while connecting team communication to the software implementation. That language can be ubiquitous in the team’s work.

The vocabulary of that UBIQUITOUS LANGUAGE includes the names of classes and prominent operations. The LANGUAGE includes terms to discuss rules that have been made explicit in the model. It is supplemented with terms from high-level organizing principles imposed on the model (such as CONTEXT MAPS and large-scale structures, which will be discussed in Chapters 14 and 16). Finally, this language is enriched with the names of patterns the team commonly applies to the domain model.

The model relationships become the combinatory rules all languages have. The meanings of words and phrases echo the semantics of the model.

The model-based language should be used among developers to describe not only artifacts in the system, but tasks and functionality. This same model should supply the language for the developers and domain experts to communicate with each other, and for the domain experts to communicate among themselves about requirements, development planning, and features. The more pervasively the language is used, the more smoothly understanding will flow.

At least, this is where we need to go. But initially the model may simply not be good enough to fill these roles. It may lack the semantic richness of the specialized jargons of the field. But those jargons can’t be used unadulterated because they contain ambiguities and contradictions. It may lack the more subtle and active features the developers have created in the code, either because they do not think of those as part of a model, or because the coding style is procedural and only implicitly carries those concepts of the domain.

But although the sequence seems circular, the knowledge crunching process that can produce a more useful kind of model depends on the team’s commitment to model-based language. Persistent use of the UBIQUITOUS LANGUAGE will force the model’s weaknesses into the open. The team will experiment and find alternatives to awkward terms or combinations. As gaps are found in the language, new words will enter the discussion. These changes to the language will be recognized as changes in the domain model and will lead the team to update class diagrams and rename classes and methods in the code, or even change behavior, when the meaning of a term changes.

Committed to using this language in the context of implementation, the developers will point out imprecision or contradictions, engaging the domain experts in discovering workable alternatives.

Of course, domain experts will speak outside the scope of the UBIQUITOUS LANGUAGE, to explain and give broader context. But within the scope the model addresses, they should use LANGUAGE and raise concerns when they find it awkward or incomplete—or wrong. By using the model-based language pervasively and not being satisfied until it flows, we approach a model that is complete and comprehensible, made up of simple elements that combine to express complex ideas.

Therefore:

Use the model as the backbone of a language. Commit the team to exercising that language relentlessly in all communication within the team and in the code. Use the same language in diagrams, writing, and especially speech.

Iron out difficulties by experimenting with alternative expressions, which reflect alternative models. Then refactor the code, renaming classes, methods, and modules to conform to the new model. Resolve confusion over terms in conversation, in just the way we come to agree on the meaning of ordinary words.

Recognize that a change in the UBIQUITOUS LANGUAGE is a change to the model.

Domain experts should object to terms or structures that are awkward or inadequate to convey domain understanding; developers should watch for ambiguity or inconsistency that will trip up design.

With a UBIQUITOUS LANGUAGE, the model is not just a design artifact. It becomes integral to everything the developers and domain experts do together. The LANGUAGE carries knowledge in a dynamic form. Discussion in the LANGUAGE brings to life the meaning behind the diagrams and code.

Image Image Image
This discussion of UBIQUITOUS LANGUAGE assumes that there is just one model in play. Chapter 14, “Maintaining Model Integrity,” deals with the coexistence of different models (and LANGUAGES) and how to keep a model from splintering.

The UBIQUITOUS LANGUAGE is the primary carrier of the aspects of design that don’t appear in code—large-scale structures that organize the whole system (see Chapter 16), BOUNDED CONTEXTS that define the relationships of different systems and models (see Chapter 14), and other patterns applied to the model and design.

Example: Working Out a Cargo Router
The following two dialogs have subtle, but important, differences. In each scenario, watch for how much the speakers talk about what the software means to the business versus how it works technically. Are the user and developer speaking the same language? Is that language rich enough to carry the discussion of what the application must do?

Scenario 1: Minimal Abstraction of the Domain
Image
Figure 2.1

User: So when we change the customs clearance point, we need to redo the whole routing plan.

Developer: Right. We’ll delete all the rows in the shipment table with that cargo id, then we’ll pass the origin, destination, and the new customs clearance point into the Routing Service, and it will re-populate the table. We’ll have to have a Boolean in the Cargo so we’ll know there is data in the shipment table.

User: Delete the rows? OK, whatever. Anyway, if we didn’t have a customs clearance point at all before, we’ll have to do the same thing.

Developer: Sure, anytime you change the origin, destination, or customs clearance point (or enter one for the first time), we’ll check to see if we have shipment data and then we’ll delete it and then let the Routing Service regenerate it.

User: Of course, if the old customs clearance just happened to be the right one, we wouldn’t want to do that.

Developer: Oh, no problem. It’s easier to just make the Routing Service redo the loads and unloads every time.

User: Yes, but it’s extra work for us to make all the supporting plans for a new itinerary, so we don’t want to reroute unless the change necessitates it.

Developer: Ugh. Well, then, if you are entering a customs clearance point for the first time, we’ll have to query the table to find the old derived customs clearance point, and then compare it to the new one. Then we’ll know if we need to redo it.

User: You won’t have to worry about this on origin or destination, since the itinerary would always change then.

Developer: Good. We won’t.

Scenario 2: Domain Model Enriched to Support Discussion
Image
Figure 2.2

User: So when we change the customs clearance point, we need to redo the whole routing plan.

Developer: Right. When you change any of the attributes in the Route Specification, we’ll delete the old Itinerary and ask the Routing Service to generate a new one based on the new Route Specification.

User: If we hadn’t specified a customs clearance point at all before, we’ll have to do that at the same time.

Developer: Sure, anytime you change anything in the Route Spec, we’ll regenerate the Itinerary. That includes entering something for the first time.

User: Of course, if the old customs clearance just happened to be the right one, we wouldn’t want to do that.

Developer: Oh, no problem. It’s easier to just make the Routing Service redo the Itinerary every time.

User: Yes, but it’s extra work for us to make all the supporting plans for a new Itinerary, so we don’t want to reroute unless the change necessitates it.

Developer: Oh. Then we’ll have to add some functionality to the Route Specification. Then, whenever you change anything in the Spec, we’ll see if the Itinerary still satisfies the Specification. If it doesn’t, we’ll have the Routing Service regenerate the Itinerary.

User: You won’t have to worry about this on origin or destination, since the Itinerary would always change then.

Developer: Fine, but it will be simpler for us to just do the comparison every time. The Itinerary will only be generated when the Route Specification is no longer satisfied.

The second dialog conveys more of the intent of the domain expert. The user employed the word “itinerary” in both dialogs, but in the second it was an object the two could discuss precisely, concretely. They discussed the “route specification” explicitly, instead of describing it each time in terms of attributes and procedures.

These two dialogs were deliberately constructed to closely parallel each other. Realistically, the first would have been more verbose, bloated with explanations of application features and miscommunications. The domain-model-based terminology of the second design makes the second dialog more concise.

MODELING OUT LOUD
The detachment of speech from other forms of communication is a particularly great loss because we humans have a genius for spoken language. Unfortunately, when people speak, they usually don’t use the language of the domain model.

That statement may not ring true for you initially, and indeed there are exceptions. But the next time you attend a requirements or design discussion, really listen. You’ll hear descriptions of features in business jargon or layman’s versions of the jargon. You’ll hear talk about technical artifacts and concrete functionality. Sure, you’ll hear terms from the domain model; obvious nouns in the common language from the business jargon will typically be coded as objects, and so those terms will tend to be mentioned. But do you hear phrases that could even remotely be described in terms of relationships and interactions in your current domain model?

One of the best ways to refine a model is to explore with speech, trying out loud various constructs from possible model variations. Rough edges are easy to hear.

“If we give the Routing Service an origin, destination, and arrival time, it can look up the stops the cargo will have to make and, well . . . stick them in the database.” (vague and technical)

“The origin, destination, and so on . . . it all feeds into the Routing Service, and we get back an Itinerary that has everything we need in it.” (more complete, but verbose)

“A Routing Service finds an Itinerary that satisfies a Route Specification.” (concise)

It is vital that we play around with words and phrases, harnessing our linguistic abilities to the modeling effort, just as it is vital to engage our visual/spatial reasoning by sketching diagrams. Just as we employ our analytical abilities with methodical analysis and design, and that mysterious “feel” of the code. These ways of thinking complement each other, and it takes all of them to find useful models and designs. Of all of these, experimenting with language is most often overlooked. (Part III of this book will delve into this discovery process and show this interplay in several dialogs.)

In fact, our brains seem to be somewhat specialized for dealing with complexity in spoken language (one good treatment for laymen, like myself, is The Language Instinct, by Steven Pinker [Pinker 1994]). For example, when people of different language backgrounds come together for commerce, if they don’t have a common language they invent one, called a pidgin. The pidgin is not as comprehensive as the speakers’ original languages, but it is suited to the task at hand. When people are talking, they naturally discover differences in interpretation and the meaning of their words, and they naturally resolve those differences. They find rough spots in the language and smooth them out.

Once I took an intensive Spanish class in college. The rule in the classroom was that not a word of English could be spoken. At first, it was frustrating. It felt very unnatural, and required a lot of self-discipline. But eventually my classmates and I broke through to a level of fluency that we could never have reached through exercises on paper.

As we use the UBIQUITOUS LANGUAGE of the domain model in discussions—especially discussions in which developers and domain experts hash out scenarios and requirements—we become more fluent in the language and teach each other its nuances. We naturally come to share the language that we speak in a way that never happens with diagrams and documents.

Bringing about a UBIQUITOUS LANGUAGE on a software project is easier said than done, and we have to fully employ our natural talents to pull it off. Just as humans’ visual and spatial capabilities let us convey and process information rapidly in graphical overviews, we can exploit our innate talent for grammatical, meaningful language to drive model development.

Therefore, as an addendum to the UBIQUITOUS LANGUAGE pattern:

Play with the model as you talk about the system. Describe scenarios out loud using the elements and interactions of the model, combining concepts in ways allowed by the model. Find easier ways to say what you need to say, and then take those new ideas back down to the diagrams and code.

ONE TEAM, ONE LANGUAGE
Technical people often feel the need to “shield” the business experts from the domain model. They say:

“Too abstract for them.”

“They don’t understand objects.”

“We have to collect requirements in their terminology.”

These are just a few of the reasons I’ve heard for having two languages on the team. Forget them.

Of course there are technical components of the design that may not concern the domain experts, but the core of the model had better interest them. Too abstract? Then how do you know the abstractions are sound? Do you understand the domain as deeply as they do? Sometimes specific requirements are collected from lower-level users, and a subset of the more concrete terminology may be needed for them, but a domain expert is assumed to be capable of thinking somewhat deeply about his or her field. If sophisticated domain experts don’t understand the model, there is something wrong with the model.

Now at the beginning, when the users are discussing future capabilities of the system that haven’t been modeled yet, there is no model for them to use. But as soon as they begin to work through these new ideas with the developers, the process of groping toward a shared model begins. It may start out awkward and incomplete, but it will gradually get refined. As the new language evolves, the domain experts must make the extra effort to adopt it, and to retrofit any old documents that are still important.

When domain experts use this LANGUAGE in discussions with developers or among themselves, they quickly discover areas where the model is inadequate for their needs or seems wrong to them. The domain experts (with the help of the developers) will also find areas where the precision of the model-based language exposes contradictions or vagueness in their thinking.

The developers and domain experts can informally test the model by walking through scenarios, using the model objects step-by-step. Almost every discussion is an opportunity for the developers and user experts to play with the model together, deepening each other’s understanding and refining concepts as they go.

The domain experts can use the language of the model in writing use cases, and can work even more directly with the model by specifying acceptance tests.

Objections are sometimes raised to the idea of using the language of the model to collect requirements. After all, shouldn’t requirements be independent of the design that fulfills them? This overlooks the reality that all language is based on some model. The meanings of words are slippery things. The domain model will typically derive from the domain experts’ own jargon but will have been “cleaned up,” to have sharper, narrower definitions. Of course, the domain experts should object if these definitions diverge from the meanings accepted in the field. In an Agile process, requirements evolve as a project goes along because hardly ever does the knowledge exist up front to specify an application adequately. Part of this evolution should be the reframing of the requirements in the refined UBIQUITOUS LANGUAGE.

Multiplicity of languages is often necessary, but the linguistic division should never be between the domain experts and the developers. (Chapter 12, “Maintaining Model Integrity,” deals with the coexistence of models on the same project.)

Of course, developers do use technical terminology that a domain expert wouldn’t understand. Developers have an extensive jargon that they need to discuss the technical aspects of a system. Almost certainly, the users will also have specialized jargon that goes well beyond the narrow scope of the application and the understanding of the developers. But these are extensions to the language. These dialects should not contain alternative vocabularies for the same domain that reflect distinct models.

Image
Figure 2.3. UBIQUITOUS LANGUAGE is cultivated in the intersection of jargons.

With a UBIQUITOUS LANGUAGE, conversations among developers, discussions among domain experts, and expressions in the code itself are all based on the same language, derived from a shared domain model.

DOCUMENTS AND DIAGRAMS
Whenever I’m in a meeting discussing a software design, I can hardly function without drawing on a whiteboard or sketchpad. A good part of what I draw is UML diagrams, mostly class diagrams or object-interactions.

Some people are naturally visual, and diagrams help people grasp certain kinds of information. UML diagrams are pretty good at communicating relationships between objects, and they are fair at showing interactions. But they do not convey the conceptual definitions of those objects. In a meeting, I would flesh out those meanings in speech as I sketched the diagram, or they would emerge in a dialog with other participants.

Simple, informal UML diagrams can anchor a discussion. Sketch a diagram of three to five objects central to the issue at hand, and everyone can stay focused. Everyone will share a view of the relationships between the objects and, significantly, the objects’ names. The spoken discussion can be more effective with this aid. A diagram can be changed as people try different thought experiments, and the sketch will take on some of the fluidity of spoken words, a true part of the discussion. After all, UML stands for Unified Modeling Language.

The trouble comes when people feel compelled to convey the whole model or design through UML. A lot of object model diagrams are too complete and, simultaneously, leave too much out. They are too complete because people feel they have to put all the objects that they are going to code into a modeling tool. With all that detail, no one can see the forest for the trees.

Yet in spite of all that detail, the attributes and relationships are only half the story of an object model. The behavior of those objects and the constraints on them are not so easily illustrated. Object interaction diagrams can illustrate some tricky hotspots in the design, but the bulk of the interactions can’t be shown that way. It is just too much work, both to create the diagrams and to read them. And an interaction diagram can still only imply the purpose behind the model. To include constraints and assertions, UML falls back on text, placed in little brackets, inserted into the diagram.

The behavioral responsibilities of an object can be hinted at through operation names, and they can be implicitly demonstrated with object interaction (or sequence) diagrams, but they cannot be stated. So, this task falls to supplemental text or conversation. In other words, a UML diagram cannot convey two of the most important aspects of a model: the meaning of the concepts it represents, and what the objects are meant to do. This needn’t trouble us, though, because careful use of English (or Spanish, or whatever) can fill this role pretty well.

Nor is UML a very satisfying programming language. Every attempt I’ve seen to use the code-generation capabilities of the modeling tools has been counterproductive. If you are constrained by the capabilities of UML, you will often have to leave out the most crucial part of the model because it is some rule that doesn’t fit into a box-and-line diagram. And, of course, a code generator cannot make use of those textual annotations. If you do use some technology that allows executable programs to be written in a UML-like diagramming language, then the UML diagram is reduced to merely another way to view the program itself, and the very meaning of “model” is lost. If you use UML as your implementation language, you will still need other means of communicating the uncluttered model.

Diagrams are a means of communication and explanation, and they facilitate brainstorming. They serve these ends best if they are minimal. Comprehensive diagrams of the entire object model fail to communicate or explain; they overwhelm the reader with detail and they lack meaning. This leads us away from the all-encompassing object model diagram, or even the all-encompassing database repository of UML. It leads us toward simplified diagrams of conceptually important parts of the object model that are essential to understanding the design. The diagrams in this book are typical of those I use on projects. They simplify, they explain, and they even incorporate a bit of nonstandard notation when it clarifies their point. They show design constraints, but they are not design specifications in every detail. They represent the skeletons of ideas.

The vital detail about the design is captured in the code. A well-written implementation should be transparent, revealing the model underlying it. (Making sure that this happens is the subject of the next chapter and much of the rest of this book.) Supplemental diagrams and documents can guide people’s attention to the central points. Natural language discussion can fill in the nuances of meaning. This is why I prefer to turn things inside out from the way a typical UML diagram handles them. Rather than a diagram annotated with text, I write a text document illustrated with selective and simplified diagrams.

Always remember that the model is not the diagram. The diagram’s purpose is to help communicate and explain the model. The code can serve as a repository of the details of the design. Well-written Java is as expressive as UML in its way. Carefully selected and constructed diagrams can serve to focus attention and aid navigation if they are not obscured by a compulsion to represent the model or design completely.

Written Design Documents
Spoken communication supplements the code’s rigor and detail with meaning. But although talking is critical to connecting everyone to the model, a group of any size will probably need the stability and share-ability of some written documents. But making written documents that actually help the team produce good software is a challenge.

Once a document takes on a persistent form, it often loses its connection with the flow of the project. It is left behind by the evolution of the code, or by the evolution of the language of the project.

Many approaches can work. A few specific documents will be suggested much later, in Part IV of this book, which address particular needs, but I make no attempt to prescribe a set of documents a project should use. Instead, I will offer two general guidelines for evaluating a document.

Documents Should Complement Code and Speech
Each Agile process has its own philosophy about documents. Extreme Programming advocates using no extra design documents at all and letting the code speak for itself. Running code doesn’t lie, as any other document might. The behavior of running code is unambiguous.

Extreme Programming concentrates exclusively on the active elements of a program and executable tests. Even comments added to the code do not affect program behavior, so they always fall out of sync with the active code and its driving model. External documents and diagrams do not affect the behavior of the program, so they fall out of sync. On the other hand, spoken communication and ephemeral diagrams on whiteboards do not linger to create confusion. This dependence on the code as communication medium motivates developers to keep the code clean and transparent.

But code as a design document does have its limits. It can overwhelm the reader with detail. Although its behavior is unambiguous, that doesn’t mean it is obvious. And the meaning behind a behavior can be hard to convey. In other words, documenting exclusively through code has some of the same basic problems as using comprehensive UML diagrams. Of course, massive spoken communication within the team gives context and guidance around the code, but it is ephemeral and localized. And developers are not the only people who need to understand the model.

A document shouldn’t try to do what the code already does well. The code already supplies the detail. It is an exact specification of program behavior.

Other documents need to illuminate meaning, to give insight into large-scale structures, and to focus attention on core elements. Documents can clarify design intent when the programming language does not support a straightforward implementation of a concept. Written documents should complement the code and the talking.

Documents Should Work for a Living and Stay Current
When I document a model in writing, I diagram small, carefully selected subsets of the model and surround them with text. I define the classes and their responsibilities in words and frame them in a context of meaning as only a natural language can. But the diagram shows some of the choices that have been made in formalizing and paring down the concepts into an object model. These diagrams can be somewhat casual—even hand-drawn. In addition to saving labor, hand-drawn diagrams have the advantage of feeling casual and temporary. These are good things to communicate because they are generally true of our model ideas.

The greatest value of a design document is to explain the concepts of the model, help in navigating the detail of the code, and perhaps give some insight into the model’s intended style of use. Depending on the philosophy of the team, the whole design document could be as simple as a set of sketches posted on the walls, or it could be substantial.

A document must be involved in project activities. The easiest way to judge this is to observe the document’s interaction with the UBIQUITOUS LANGUAGE. Is the document written in the language people speak on the project (now)? Is it written in the language embedded in the code?

Listen to the UBIQUITOUS LANGUAGE and how it is changing. If the terms explained in a design document don’t start showing up in conversations and code, the document is not fulfilling its purpose. Maybe the document is too big or complicated. Maybe it is not focused on a sufficiently important topic. People are either not reading it or not finding it compelling. If it is having no impact on the UBIQUITOUS LANGUAGE, something is wrong.

Conversely, you may hear the UBIQUITOUS LANGUAGE changing naturally while a document is being left behind. Evidently the document does not seem relevant to people or does not seem important enough to update. It could safely be archived as history, but left active it could create confusion and hurt the project. And if a document isn’t playing an important role, keeping it up to date through sheer will and discipline wastes effort.

The UBIQUITOUS LANGUAGE allows other documents, such as requirements specifications, to be more concise and less ambiguous. As the domain model comes to reflect the most relevant knowledge of the business, application requirements become scenarios within that model, and the UBIQUITOUS LANGUAGE can be used to describe such a scenario in terms that directly connect to the MODEL-DRIVEN DESIGN (see Chapter 3). As a result, specifications can be written more simply, because they do not have to convey the business knowledge that lies behind the model.

By keeping documents minimal and focusing them on complementing code and conversation, documents can stay connected to the project. Let the UBIQUITOUS LANGUAGE and its evolution be your guide to choosing documents that live and get woven into the project’s activity.

Executable Bedrock
Now let’s examine the choice of the XP community and some others, to rely almost exclusively on the executable code and its tests. Much of this book discusses ways to make the code convey meaning through a MODEL-DRIVEN DESIGN (see Chapter 3). Well-written code can be very communicative, but the message it communicates is not guaranteed to be accurate. Oh, the reality of the behavior caused by a section of code is inescapable. But a method name can be ambiguous, misleading, or out of date compared to the internals of the method. The assertions in a test are rigorous, but the story told by variable names and the organization of the code is not. Good programming style keeps this connection as direct as possible, but it is still an exercise in self-discipline. It takes fastidiousness to write code that doesn’t just do the right thing but also says the right thing.

Elimination of those discrepancies is a major selling point of approaches such as declarative design (discussed in Chapter 10), in which a statement of the purpose of a program element determines its actual behavior in the program. The drive to generate programs from UML is partly motivated by this, though it generally hasn’t worked out well so far.

Still, while even code can mislead, it is closer to the ground than other documents. Aligning the behavior, intent, and message of code using current standard technology requires discipline and a certain way of thinking about design (discussed at length in Part III). To communicate effectively, the code must be based on the same language used to write the requirements—the same language that the developers speak with each other and with domain experts.

EXPLANATORY MODELS
The thrust of this book is that one model should underlie implementation, design, and team communication. Having separate models for these separate purposes poses a hazard.

Models can also be valuable as education aids to teach about the domain. The model that drives the design is one view of the domain, but it may aid learning to have other views, used only as educational tools, to communicate general knowledge of the domain. For this purpose, people can use pictures or words that convey other kinds of models unrelated to software design.

One particular reason that other models are needed is scope. The technical model that drives the software development process must be strictly pared down to the necessary minimum to fulfill its functions. An explanatory model can include aspects of the domain that provide context that clarifies the more narrowly scoped model.

Explanatory models offer the freedom to create much more communicative styles tailored to a particular topic. Visual metaphors used by the domain experts in a field often present clearer explanations, educating developers and harmonizing experts. Explanatory models also present the domain in a way that is simply different, and multiple, diverse explanations help people learn.

There is no need for explanatory models to be object models, and it is generally best if they are not. It is actually helpful to avoid UML in these models, to avoid any false impression of correspondence with the software design. Even though the explanatory model and the model that drives design do often correspond, the similarities will seldom be exact. To avoid confusion, everyone must be conscious of the distinction.

Example: Shipping Operations and Routes
Consider an application that tracks cargos for a shipping company. The model includes a detailed view of how port operations and vessel voyages are assembled into an operational plan for a cargo (a “route”). But to the uninitiated, a class diagram may not be very illuminating.

Image
Figure 2.4. A class diagram for a shipping route

In such a case, an explanatory model can help team members understand what the class diagram actually means. Here is another way of looking at the same concepts:

Each line in Figure 2.5 represents either a port operation (loading or unloading the cargo), or cargo sitting in storage on the ground, or cargo sitting on a ship en route. This does not correspond in detail with the class diagram, but it reinforces key points from the domain.

Image
Figure 2.5. An explanatory model for a shipping route

This sort of diagram, along with natural language explanations of the model it represents, can help developers and domain experts alike understand the more rigorous software model diagrams. Together they are easier to understand than either view alone.
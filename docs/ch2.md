# 第 2 章 交流与语言的使用

> Two. Communication and the Use of Language

A domain model can be the core of a common language for a software project. The model is a set of concepts built up in the heads of people on the project, with terms and relationships that reflect domain insight. These terms and interrelationships provide the semantics of a language that is tailored to the domain while being precise enough for technical development. This is a crucial cord that weaves the model into development activity and binds it with the code.

> 领域模型可成为软件项目通用语言的核心。该模型是一组得自于项目人员头脑中的概念，以及反映了领域深层含义的术语和关系。这些术语和相互关系提供了模型语言的语义，虽然语言是为领域量身定制的，但就技术开发而言，其依然足够精确。正是这条至关重要的纽带，将模型与开发活动结合在一起，并使模型与代码紧密绑定。

This model-based communication is not limited to diagrams in Unified Modeling Language (UML). To make most effective use of a model, it needs to pervade every medium of communication. It increases the utility of written text documents, as well as the informal diagrams and casual conversation reemphasized in Agile processes. It improves communication through the code itself and through the tests for that code.

> 这种基于模型的交流并不局限于 UML（统一建模语言）图。为了最有效地使用模型，需要充分利用各种交流手段。基于模型的交流提高了书面文档的效用，也提高了敏捷过程中再度强调的非正式图表和交谈的效用。它还通过代码本身及对应的测试促进了交流。

The use of language on a project is subtle but all-important. . . .

> 在项目中，语言的使用很微妙，但却至关重要……

## 2.1 UBIQUITOUS LANGUAGE

For first you write a sentence,
And then you chop it small;
Then mix the bits, and sort them out
Just as they chance to fall:
The order of the phrases makes
No difference at all.

—Lewis Carroll, “Poeta Fit, Non Nascitur”

> 首先写下一个句子，  
> 然后将它分成小段，  
> 再将它们打乱并重新排序。  
> 仿佛是巧合一样，  
> 短语的顺序对意思完全没有影响。

> ——Lewis Carroll, “Poeta Fit, Non Nascitur”

To create a supple, knowledge-rich design calls for a versatile, shared team language, and a lively experimentation with language that seldom happens on software projects.

> 要想创建一种灵活的、蕴含丰富知识的设计，需要一种通用的、共享的团队语言，以及对语言不断的试验——然而，软件项目上很少出现这样的试验。

---

Domain experts have limited understanding of the technical jargon of software development, but they use the jargon of their field—probably in various flavors. Developers, on the other hand, may understand and discuss the system in descriptive, functional terms, devoid of the meaning carried by the experts’ language. Or developers may create abstractions that support their design but are not understood by the domain experts. Developers working on different parts of the problem work out their own design concepts and ways of describing the domain.

> 虽然领域专家对软件开发的技术术语所知有限，但他们能熟练使用自己领域的术语——可能还具有各种不同的风格。另一方面，开发人员可能会用一些描述性的、功能性的术语来理解和讨论系统，而这些术语并不具备领域专家的语言所要传达的意思。或者，开发人员可能会创建一些用于支持设计的抽象，但领域专家无法理解这些抽象。负责处理问题不同部分的开发人员可能会开发出各自不同的设计概念以及描述领域的方式。

Across this linguistic divide, the domain experts vaguely describe what they want. Developers, struggling to understand a domain new to them, vaguely understand. A few members of the team manage to become bilingual, but they become bottlenecks of information flow, and their translations are inexact.

> 由于语言上存在鸿沟，领域专家们只能模糊地描述他们想要的东西。开发人员虽然努力去理解一个自己不熟悉的领域，但也只能形成模糊的认识。虽然少数团队成员会设法掌握这两种语言，但他们会变成信息流的瓶颈，并且他们的翻译也不准确。

On a project without a common language, developers have to translate for domain experts. Domain experts translate between developers and still other domain experts. Developers even translate for each other. Translation muddles model concepts, which leads to destructive refactoring of code. The indirectness of communication conceals the formation of schisms—different team members use terms differently but don’t realize it. This leads to unreliable software that doesn’t fit together (see Chapter 14). The effort of translation prevents the interplay of knowledge and ideas that lead to deep model insights.

> 在一个没有公共语言的项目上，开发人员不得不为领域专家做翻译。而领域专家需要充当开发人员与其他领域专家之间的翻译。甚至开发人员之间还需要互相翻译。这些翻译使模型概念变得混淆，而这会导致有害的代码重构。这种间接的沟通掩盖了分裂的形成——不同的团队成员使用不同的术语而尚不自知。由于软件的各个部分不能够浑然一体，因此这就导致无法开发出可靠的软件（参见第 14 章）。翻译工作导致各类促进深入理解模型的知识和想法无法结合到一起。

A project faces serious problems when its language is fractured. Domain experts use their jargon while technical team members have their own language tuned for discussing the domain in terms of design.

> 如果语言支离破碎，项目必将遭遇严重问题。领域专家使用他们自己的术语，而技术团队所使用的语言则经过调整，以便从设计角度讨论领域。

The terminology of day-to-day discussions is disconnected from the terminology embedded in the code (ultimately the most important product of a software project). And even the same person uses different language in speech and in writing, so that the most incisive expressions of the domain often emerge in a transient form that is never captured in the code or even in writing.

> 日常讨论所使用的术语与代码（软件项目的最重要产品）中使用的术语不一致。甚至同一个人在讲话和写东西时使用的语言也不一致，这导致的后果是，对领域的深刻表述常常稍纵即逝，根本无法记录到代码或文档中。

Translation blunts communication and makes knowledge crunching anemic.

> 翻译使得沟通不畅，并削弱了知识消化。

Yet none of these dialects can be a common language because none serves all needs.

> 然而任何一方的语言都不能成为公共语言，因为它们无法满足所有的需求。

The overhead cost of all the translation, plus the risk of misunderstanding, is just too high. A project needs a common language that is more robust than the lowest common denominator. With a conscious effort by the team, the domain model can provide the backbone for that common language, while connecting team communication to the software implementation. That language can be ubiquitous in the team’s work.

> 所有翻译的开销，连带着误解的风险，成本实在太高了。项目需要一种公共语言，这种语言要比所有语言的最小公分母健壮得多。通过团队的一致努力，领域模型可以成为这种公共语言的核心，同时将团队沟通与软件实现紧密联系到一起。该语言将存在于团队工作中的方方面面。

The vocabulary of that UBIQUITOUS LANGUAGE includes the names of classes and prominent operations. The LANGUAGE includes terms to discuss rules that have been made explicit in the model. It is supplemented with terms from high-level organizing principles imposed on the model (such as CONTEXT MAPS and large-scale structures, which will be discussed in Chapters 14 and 16). Finally, this language is enriched with the names of patterns the team commonly applies to the domain model.

> UBIQUITOUS LANGUAGE（通用语言）的词汇包括类和主要操作的名称。语言中的术语，有些用来讨论模型中已经明确的规则，还有一些则来自施加于模型上的高级组织原则（如第 14 章和第 16 章要讨论的 CONTEXT MAP 和大型结构）。最后，团队常常应用于领域模型的模式名称也使这种语言更为丰富。

The model relationships become the combinatory rules all languages have. The meanings of words and phrases echo the semantics of the model.

> 模型之间的关系成为所有语言都具有的组合规则。词和短语的意义反映了模型的语义。

The model-based language should be used among developers to describe not only artifacts in the system, but tasks and functionality. This same model should supply the language for the developers and domain experts to communicate with each other, and for the domain experts to communicate among themselves about requirements, development planning, and features. The more pervasively the language is used, the more smoothly understanding will flow.

> 开发人员应该使用基于模型的语言来描述系统中的工件、任务和功能。这个模型应该为开发人员和领域专家提供一种用于相互交流的语言，而且领域专家还应该使用这种语言来讨论需求、开发计划和特性。语言使用得越普遍，理解进行得就越顺畅。

At least, this is where we need to go. But initially the model may simply not be good enough to fill these roles. It may lack the semantic richness of the specialized jargons of the field. But those jargons can’t be used unadulterated because they contain ambiguities and contradictions. It may lack the more subtle and active features the developers have created in the code, either because they do not think of those as part of a model, or because the coding style is procedural and only implicitly carries those concepts of the domain.

> 至少，我们应该将它作为目标。但最初，模型可能不太好，因此无法很好地履行这些职责。它可能不会像领域的专业术语那样具有丰富的语义。但我们又不能直接使用那些术语，因为它们有歧义和矛盾。模型可能缺乏开发人员在代码中所创建的更为微妙和灵活的特性，这要么是因为开发人员认为模型不必具备这些特性，要么是因为编码风格是过程式的，只能隐含地表达领域概念。

But although the sequence seems circular, the knowledge crunching process that can produce a more useful kind of model depends on the team’s commitment to model-based language. Persistent use of the UBIQUITOUS LANGUAGE will force the model’s weaknesses into the open. The team will experiment and find alternatives to awkward terms or combinations. As gaps are found in the language, new words will enter the discussion. These changes to the language will be recognized as changes in the domain model and will lead the team to update class diagrams and rename classes and methods in the code, or even change behavior, when the meaning of a term changes.

> 至少，我们应该将它作为目标。但最初，模型可能不太好，因此无法很好地履行这些职责。它可能不会像领域的专业术语那样具有丰富的语义。但我们又不能直接使用那些术语，因为它们有歧义和矛盾。模型可能缺乏开发人员在代码中所创建的更为微妙和灵活的特性，这要么是因为开发人员认为模型不必具备这些特性，要么是因为编码风格是过程式的，只能隐含地表达领域概念。

Committed to using this language in the context of implementation, the developers will point out imprecision or contradictions, engaging the domain experts in discovering workable alternatives.

> 通过在实现的过程中使用这种语言，开发人员能够指出不准确和矛盾之处，并和领域专家一起找到有效的替代方案。

Of course, domain experts will speak outside the scope of the UBIQUITOUS LANGUAGE, to explain and give broader context. But within the scope the model addresses, they should use LANGUAGE and raise concerns when they find it awkward or incomplete—or wrong. By using the model-based language pervasively and not being satisfied until it flows, we approach a model that is complete and comprehensible, made up of simple elements that combine to express complex ideas.

> 当然，为了解释和给出更广泛的上下文，领域专家的语言会超出 UBIQUITOUS LANGUAGE 的范围。但在模型应对的范围内，他们应该使用 UBIQUITOUS LANGUAGE，并在发现不合适、不完整或错误之处后要引起注意。通过大量使用基于模型的语言，并且不达流畅绝不罢休，我们可以逐步得到一个完整的、易于理解的模型，它由简单元素组成，并通过组合这些简单元素表达复杂的概念。

Therefore:

> 因此：

Use the model as the backbone of a language. Commit the team to exercising that language relentlessly in all communication within the team and in the code. Use the same language in diagrams, writing, and especially speech.

> 将模型作为语言的支柱。确保团队在内部的所有交流中以及代码中坚持使用这种语言。在画图、写东西，特别是讲话时也要使用这种语言。

Iron out difficulties by experimenting with alternative expressions, which reflect alternative models. Then refactor the code, renaming classes, methods, and modules to conform to the new model. Resolve confusion over terms in conversation, in just the way we come to agree on the meaning of ordinary words.

> 通过尝试不同的表示方法（它们反映了备选模型）来消除难点。然后重构代码，重新命名类、方法和模块，以便与新模型保持一致。解决交谈中的术语混淆问题，就像我们对普通词汇形成一致的理解一样。

Recognize that a change in the UBIQUITOUS LANGUAGE is a change to the model.

> 要认识到，UBIQUITOUS LANGUAGE 的更改就是对模型的更改。

Domain experts should object to terms or structures that are awkward or inadequate to convey domain understanding; developers should watch for ambiguity or inconsistency that will trip up design.

> 领域专家应该抵制不合适或无法充分表达领域理解的术语或结构，开发人员应该密切关注那些将会妨碍设计的有歧义和不一致的地方。

With a UBIQUITOUS LANGUAGE, the model is not just a design artifact. It becomes integral to everything the developers and domain experts do together. The LANGUAGE carries knowledge in a dynamic form. Discussion in the LANGUAGE brings to life the meaning behind the diagrams and code.

> 有了 UBIQUITOUS LANGUAGE，模型就不仅仅是一个设计工件了。它成为开发人员和领域专家共同完成的每项工作中不可或缺的部分。语言以动态形式传递知识。使用这种语言进行讨论能够呈现图和代码背后的真实含义。

---

This discussion of UBIQUITOUS LANGUAGE assumes that there is just one model in play. Chapter 14, “Maintaining Model Integrity,” deals with the coexistence of different models (and LANGUAGES) and how to keep a model from splintering.

> 我们在这里讨论的 UBIQUITOUS LANGUAGE 假设只有一个模型在起作用。第 14 章将讨论不同模型（和语言）的共存，以及如何防止模型分裂。

The UBIQUITOUS LANGUAGE is the primary carrier of the aspects of design that don’t appear in code—large-scale structures that organize the whole system (see Chapter 16), BOUNDED CONTEXTS that define the relationships of different systems and models (see Chapter 14), and other patterns applied to the model and design.

> UBIQUITOUS LANGUAGE 是那些以非代码形式呈现的设计的主要载体，这些包括把整个系统组织在一起的大尺度结构（参见第 16 章）、定义了不同系统和模型之间关系的限界上下文（参见第 14 章），以及在模型和设计中使用的其他模式。

### Example: Working Out a Cargo Router 示例制定货运路线

The following two dialogs have subtle, but important, differences. In each scenario, watch for how much the speakers talk about what the software means to the business versus how it works technically. Are the user and developer speaking the same language? Is that language rich enough to carry the discussion of what the application must do?

> 下面这两段对话有着微妙但重要的差别。在每个对话场景中，注意观察讲话者有多少内容是谈论软件的业务功能，有多少内容是从技术上谈论软件的工作机理的。用户和开发人员用的是同一种语言吗？它的表达是否丰富，足以应对应用程序功能的讨论？

Scenario 1: Minimal Abstraction of the Domain

> 场景 1：最小化的领域抽象

Image
Figure 2.1

User: So when we change the customs clearance point, we need to redo the whole routing plan.

> 用户：那么，当更改清关（customs clearance）地点时，需要重新制定整个路线计划啰。

Developer: Right. We’ll delete all the rows in the shipment table with that cargo id, then we’ll pass the origin, destination, and the new customs clearance point into the Routing Service, and it will re-populate the table. We’ll have to have a Boolean in the Cargo so we’ll know there is data in the shipment table.

> 开发人员：是的。我们将从货运表（shipment table）中删除所有与该货物 id 相关联的行，然后将出发地、目的地和新的清关地点传递给 Routing Service，它会重新填充货运表。Cargo 中必须设立一个布尔值，用于指示货运表中是否有数据。

User: Delete the rows? OK, whatever. Anyway, if we didn’t have a customs clearance point at all before, we’ll have to do the same thing.

> 用户：删除行？好，就按你说的做。但是，如果先前根本没有指定清关地点，也需要这么做吗？

Developer: Sure, anytime you change the origin, destination, or customs clearance point (or enter one for the first time), we’ll check to see if we have shipment data and then we’ll delete it and then let the Routing Service regenerate it.

> 开发人员：是的，无论何时更改了出发地、目的地或清关地点（或是第一次输入），都将检查是否已经有货运数据，如果有，则删除它们，然后由 Routing Service 重新生成数据。

User: Of course, if the old customs clearance just happened to be the right one, we wouldn’t want to do that.

> 用户：当然，如果原有的清关数据碰巧是正确的，我们就不需要这样做了。

Developer: Oh, no problem. It’s easier to just make the Routing Service redo the loads and unloads every time.

开发人员：哦，没问题。但让 Routing Service 每次重新加载或卸载数据会更容易些。

User: Yes, but it’s extra work for us to make all the supporting plans for a new itinerary, so we don’t want to reroute unless the change necessitates it.

> 用户：是的，但为新航线制定所有支持计划的工作量很大，因此，除非非改不可，我们一般不想更改航线。

Developer: Ugh. Well, then, if you are entering a customs clearance point for the first time, we’ll have to query the table to find the old derived customs clearance point, and then compare it to the new one. Then we’ll know if we need to redo it.

> 开发人员：哦，好的，当第一次输入清关地点时，我们需要查询表格，找到以前的清关地点，然后与新的清关地点进行比较，从而判断是否需要重做。

User: You won’t have to worry about this on origin or destination, since the itinerary would always change then.

> 用户：这个处理不必考虑出发地和目的地，因为航线在此总要变更。

Developer: Good. We won’t.

> 开发人员：好的，我明白了。

Scenario 2: Domain Model Enriched to Support Discussion

> 场景 2：用领域模型进行讨论

Image
Figure 2.2

User: So when we change the customs clearance point, we need to redo the whole routing plan.

> 用户：那么，当更改清关地点时，需要重新制定整个路线计划啰。

Developer: Right. When you change any of the attributes in the Route Specification, we’ll delete the old Itinerary and ask the Routing Service to generate a new one based on the new Route Specification.

> 开发人员：是的。当更改 Route Specification（路线说明）的任意属性时，都将删除原有的 Itinerary（航线），并要求 Routing Service（路线服务）基于新的 Route Specification 生成一个新的 Itinerary。

User: If we hadn’t specified a customs clearance point at all before, we’ll have to do that at the same time.

> 用户：如果先前根本没有指定清关地点，也需要这么做吗？

Developer: Sure, anytime you change anything in the Route Spec, we’ll regenerate the Itinerary. That includes entering something for the first time.

> 开发人员：是的，无论何时更改了 Route Spec 的任何属性，都将重新生成 Itinerary。这也包括第一次输入某些属性。

User: Of course, if the old customs clearance just happened to be the right one, we wouldn’t want to do that.

> 用户：当然，如果原有的清关数据碰巧是正确的，我们就不需要这样做了。

Developer: Oh, no problem. It’s easier to just make the Routing Service redo the Itinerary every time.

> 开发人员：哦，没问题。但让 Routing Service 每次重新生成一个 Itinerary 会更容易些。

User: Yes, but it’s extra work for us to make all the supporting plans for a new Itinerary, so we don’t want to reroute unless the change necessitates it.

> 用户：是的，但为新航线制定所有支持计划的工作量很大，因此，除非非改不可，我们一般不想更改路线。

Developer: Oh. Then we’ll have to add some functionality to the Route Specification. Then, whenever you change anything in the Spec, we’ll see if the Itinerary still satisfies the Specification. If it doesn’t, we’ll have the Routing Service regenerate the Itinerary.

> 开发人员：哦。那么需要在 Route Specification 添加一些功能。这样，当更改 RouteSpecification 中的属性时，查看 Itinerary 是否仍满足 Specification。如果不满足，则需要由 Routing Service 重新生成 Itinerary。

User: You won’t have to worry about this on origin or destination, since the Itinerary would always change then.

> 用户：这一点不必考虑出发地和目的地，因为 Itinerary 在此总是要变更的。

Developer: Fine, but it will be simpler for us to just do the comparison every time. The Itinerary will only be generated when the Route Specification is no longer satisfied.

> 开发人员：好的，但每次只做比较就简单多了。只有当不满足 Route Specification 时，才重新生成 Itinerary。

The second dialog conveys more of the intent of the domain expert. The user employed the word “itinerary” in both dialogs, but in the second it was an object the two could discuss precisely, concretely. They discussed the “route specification” explicitly, instead of describing it each time in terms of attributes and procedures.

> 第二段对话表达了领域专家的更多意图。在这两段对话中，用户都使用了“itinerary”这个词，但在第二段中它是一个对象，这使得双方可以更准确、具体地进行讨论。他们明确讨论了“route specification”，而不是每次都通过属性和过程来描述它。

These two dialogs were deliberately constructed to closely parallel each other. Realistically, the first would have been more verbose, bloated with explanations of application features and miscommunications. The domain-model-based terminology of the second design makes the second dialog more concise.

> 这两段对话有意使用了相似的结构。实际上，第一段对话显得更啰嗦，对话双方需要不断对应用程序的特性和表达不清的地方进行解释。第二段对话使用了基于领域模型的术语，因此讨论更简洁。

## 2.2 MODELING OUT LOUD “大声地”建模

The detachment of speech from other forms of communication is a particularly great loss because we humans have a genius for spoken language. Unfortunately, when people speak, they usually don’t use the language of the domain model.

> 假如将交谈从沟通方式中除去的话，那会是巨大的损失，因为人类本身颇具谈话的天赋。遗憾的是，当人们交谈时，通常并不使用领域模型的语言。

That statement may not ring true for you initially, and indeed there are exceptions. But the next time you attend a requirements or design discussion, really listen. You’ll hear descriptions of features in business jargon or layman’s versions of the jargon. You’ll hear talk about technical artifacts and concrete functionality. Sure, you’ll hear terms from the domain model; obvious nouns in the common language from the business jargon will typically be coded as objects, and so those terms will tend to be mentioned. But do you hear phrases that could even remotely be described in terms of relationships and interactions in your current domain model?

> 可能开始时你并不认为上述论断是正确的，而且的确有例外情况。但下次你参加需求或设计讨论时，不妨认真听一下。你将听到人们用业务术语或者各种业余术语来描述功能。还会听到人们讨论技术工件和具体的功能。当然，你还会听到来自领域模型的术语；在人们共同使用的那部分业务术语中，那些显而易见的名词在编码时通常被用作对象名称，因此这些术语经常被人们提及。但你是否也听到一些使用当前领域模型中的关系和交互来描述的措辞呢？

One of the best ways to refine a model is to explore with speech, trying out loud various constructs from possible model variations. Rough edges are easy to hear.

> 改善模型的最佳方式之一就是通过对话来研究，试着大声说出可能的模型变化中的各种结构。这样不完善的地方很容易被听出来。

“If we give the Routing Service an origin, destination, and arrival time, it can look up the stops the cargo will have to make and, well . . . stick them in the database.” (vague and technical)

> “如果我们向 Routing Service 提供出发地、目的地和到达时间，就可以查询货物的停靠地点，嗯……将它们存到数据库中。”（含糊且偏重于技术）

“The origin, destination, and so on . . . it all feeds into the Routing Service, and we get back an Itinerary that has everything we need in it.” (more complete, but verbose)

> “出发地、目的地……把它们都输入到 Routing Service 中，而后我们得到一个 Itinerary，它包含我们所需的全部信息。”（更具体，但过于啰嗦）

“A Routing Service finds an Itinerary that satisfies a Route Specification.” (concise)

> “Routing Service 查找满足 Route Specification 的 Itinerary。”（简洁）

It is vital that we play around with words and phrases, harnessing our linguistic abilities to the modeling effort, just as it is vital to engage our visual/spatial reasoning by sketching diagrams. Just as we employ our analytical abilities with methodical analysis and design, and that mysterious “feel” of the code. These ways of thinking complement each other, and it takes all of them to find useful models and designs. Of all of these, experimenting with language is most often overlooked. (Part III of this book will delve into this discovery process and show this interplay in several dialogs.)

> 使用单词和短语是极为重要的——其将我们的语言能力用于建模工作，这就如同素描对于表现视觉和空间推理十分重要一样。我们即要利用系统性分析和设计方面的分析能力，也要利用对代码的神秘“感觉”。这些思考方式互为补充，要充分利用它们来找到有用的模型和设计。在所有这些方式中，语言上的试验常常是最容易被忽视的（本书第三部分将深入探讨这种发现过程，并通过几段对话来显示它们之间的相互影响）。

In fact, our brains seem to be somewhat specialized for dealing with complexity in spoken language (one good treatment for laymen, like myself, is The Language Instinct, by Steven Pinker [Pinker 1994]). For example, when people of different language backgrounds come together for commerce, if they don’t have a common language they invent one, called a pidgin. The pidgin is not as comprehensive as the speakers’ original languages, but it is suited to the task at hand. When people are talking, they naturally discover differences in interpretation and the meaning of their words, and they naturally resolve those differences. They find rough spots in the language and smooth them out.

> 事实上，我们的大脑似乎很擅长处理口语的复杂性（对于像我这样的门外汉，有本好书是 Steven Pinker 所著的 The Language Instinct[Pinker 1994]）。例如，当具有不同语言背景的人凑在一起做生意时，如果没有公共语言，他们就会创造一种称为“混杂语”（pidgin）的公共语言。混杂语虽然不像讲话者的母语那样详尽，但它适合当前任务。当人们交谈时，自然会发现词语解释和意义上的差别，而后会自然而然地解决这些差别。他们会发现这种语言中的简陋晦涩之处并把它们搞顺畅。

Once I took an intensive Spanish class in college. The rule in the classroom was that not a word of English could be spoken. At first, it was frustrating. It felt very unnatural, and required a lot of self-discipline. But eventually my classmates and I broke through to a level of fluency that we could never have reached through exercises on paper.

> 上大学时，我曾经修过西班牙语速成课。课堂上规定不准讲英语。起初，令人相当沮丧。这不仅感觉很别扭，而且需要很强的自制力。但最终我和同学们都达到了通过书面练习永远不可能达到的流利程度。

As we use the UBIQUITOUS LANGUAGE of the domain model in discussions—especially discussions in which developers and domain experts hash out scenarios and requirements—we become more fluent in the language and teach each other its nuances. We naturally come to share the language that we speak in a way that never happens with diagrams and documents.

> 当我们在讨论中使用领域模型的 UBIQUITOUS LANGUAGE 时，特别是在开发人员和领域专家一起推敲场景和需求时，通用语言的使用会越来越流利，而且我们还可以互相指点一些细微的差别。我们自然而然地共享了我们所说的语言，而这种方式是图和文档无法做到的。

Bringing about a UBIQUITOUS LANGUAGE on a software project is easier said than done, and we have to fully employ our natural talents to pull it off. Just as humans’ visual and spatial capabilities let us convey and process information rapidly in graphical overviews, we can exploit our innate talent for grammatical, meaningful language to drive model development.

> 当我们在讨论中使用领域模型的 UBIQUITOUS LANGUAGE 时，特别是在开发人员和领域专家一起推敲场景和需求时，通用语言的使用会越来越流利，而且我们还可以互相指点一些细微的差别。我们自然而然地共享了我们所说的语言，而这种方式是图和文档无法做到的。

Therefore, as an addendum to the UBIQUITOUS LANGUAGE pattern:

> 因此，下面这段话可作为 UBIQUITOUS LANGUAGE 模式的补充：

Play with the model as you talk about the system. Describe scenarios out loud using the elements and interactions of the model, combining concepts in ways allowed by the model. Find easier ways to say what you need to say, and then take those new ideas back down to the diagrams and code.

> 讨论系统时要结合模型。使用模型元素及其交互来大声描述场景，并且按照模型允许的方式将各种概念结合到一起。找到更简单的表达方式来讲出你要讲的话，然后将这些新的想法应用到图和代码中。

## 2.3 ONE TEAM, ONE LANGUAGE 一个团队，一种语言

Technical people often feel the need to “shield” the business experts from the domain model. They say:

> 技术人员通常认为业务专家最好不要接触领域模型，他们认为：

“Too abstract for them.”

> “领域模型对他们来说太抽象了。”

“They don’t understand objects.”

> “他们不理解对象。”

“We have to collect requirements in their terminology.”

> “这样我们就不得不用他们的术语来收集需求。”

These are just a few of the reasons I’ve heard for having two languages on the team. Forget them.

> 上面只列举了我从一个使用两种语言的团队中听到的少数几个原因。忘掉它们吧。

Of course there are technical components of the design that may not concern the domain experts, but the core of the model had better interest them. Too abstract? Then how do you know the abstractions are sound? Do you understand the domain as deeply as they do? Sometimes specific requirements are collected from lower-level users, and a subset of the more concrete terminology may be needed for them, but a domain expert is assumed to be capable of thinking somewhat deeply about his or her field. If sophisticated domain experts don’t understand the model, there is something wrong with the model.

> 当然，设计中有一些技术组件与领域专家无关，但模型的核心最好让他们参与。过于抽象？那你怎么知道抽象是否合理？你是否像他们一样深入理解领域？有时，某些特定需求是从底层用户那里收集的，他们在描述这些需求时可能会用到一小部分更具体的术语，但领域专家应该能够更深入地思考他们所从事的领域。如果连经验丰富的领域专家都不能理解模型，那么模型一定出了什么问题。

Now at the beginning, when the users are discussing future capabilities of the system that haven’t been modeled yet, there is no model for them to use. But as soon as they begin to work through these new ideas with the developers, the process of groping toward a shared model begins. It may start out awkward and incomplete, but it will gradually get refined. As the new language evolves, the domain experts must make the extra effort to adopt it, and to retrofit any old documents that are still important.

> 最初，当用户讨论系统尚未建模的未来功能时，他们没有模型可供使用。但当他们开始与开发人员一起仔细讨论这些新想法时，探索共享模型的过程就开始了。最初的模型可能很笨拙且不完整，但会逐渐精化。随着新语言的演进，领域专家必须付出更多努力来适应它，并更新那些仍然很重要的旧文档。

When domain experts use this LANGUAGE in discussions with developers or among themselves, they quickly discover areas where the model is inadequate for their needs or seems wrong to them. The domain experts (with the help of the developers) will also find areas where the precision of the model-based language exposes contradictions or vagueness in their thinking.

> 当领域专家使用这种语言互相讨论，或者与开发人员进行讨论时，很快就会发现模型中哪些地方不符合他们的需要，甚至是错误的。另一方面，模型语言的精确性也会促使领域专家（在开发人员的帮助下）发现他们想法中的矛盾和含糊之处。

The developers and domain experts can informally test the model by walking through scenarios, using the model objects step-by-step. Almost every discussion is an opportunity for the developers and user experts to play with the model together, deepening each other’s understanding and refining concepts as they go.

> 开发人员和领域专家可以通过一步一步地使用模型对象来走查场景，从而对模型进行非正式的测试。每次讨论都是开发人员和专家一起使用模型的机会，在这个过程中，他们可以加深彼此的理解，并对概念进行精化。

The domain experts can use the language of the model in writing use cases, and can work even more directly with the model by specifying acceptance tests.

> 领域专家可以使用模型语言来编写用例，甚至可以直接利用模型来具体说明验收测试。

Objections are sometimes raised to the idea of using the language of the model to collect requirements. After all, shouldn’t requirements be independent of the design that fulfills them? This overlooks the reality that all language is based on some model. The meanings of words are slippery things. The domain model will typically derive from the domain experts’ own jargon but will have been “cleaned up,” to have sharper, narrower definitions. Of course, the domain experts should object if these definitions diverge from the meanings accepted in the field. In an Agile process, requirements evolve as a project goes along because hardly ever does the knowledge exist up front to specify an application adequately. Part of this evolution should be the reframing of the requirements in the refined UBIQUITOUS LANGUAGE.

> 有时，有人会反对使用模型语言来收集需求。毕竟，难道需求不应该独立于实现它们的设计吗？这种观点忽视了所有语言都要基于某种模型这一事实。词的意义是不明确。领域模型通常是从领域专家自己的术语中推导出来的，但已经经过了“清理”，以便具有更明确、更严密的定义。当然，如果这些定义与领域公认的意义有较大差别，领域专家应该反对。在敏捷过程中，需求是随着项目的前进而演变的，因为几乎不存在现成的知识可以充分说明一个应用程序。用精化后的 UBIQUITOUS LANGUAGE 来重新组织需求应该是这种演变过程的一部分。

Multiplicity of languages is often necessary, but the linguistic division should never be between the domain experts and the developers. (Chapter 12, “Maintaining Model Integrity,” deals with the coexistence of models on the same project.)

> 语言的多样性通常是必要的，但领域专家与开发人员之间不应该有语言上的分歧（第 12 章将讨论多个模型在同一个项目上共存的情况）。

Of course, developers do use technical terminology that a domain expert wouldn’t understand. Developers have an extensive jargon that they need to discuss the technical aspects of a system. Almost certainly, the users will also have specialized jargon that goes well beyond the narrow scope of the application and the understanding of the developers. But these are extensions to the language. These dialects should not contain alternative vocabularies for the same domain that reflect distinct models.

> 当然，开发人员的确会使用领域专家无法理解的技术术语。开发人员有其所需的大量术语来讨论系统技术。几乎可以肯定的是，用户也会用开发人员无法理解的、超出应用程序范畴的专用术语。这些都是对语言的扩展。但在这些语言扩展中，同一领域的相同词汇不应该反映不同的模型。

Image
Figure 2.3. UBIQUITOUS LANGUAGE is cultivated in the intersection of jargons.

With a UBIQUITOUS LANGUAGE, conversations among developers, discussions among domain experts, and expressions in the code itself are all based on the same language, derived from a shared domain model.

> 有了 UBIQUITOUS LANGUAGE 之后，开发人员之间的对话、领域专家之间的讨论以及代码本身所表达的内容都基于同一种语言，都来自于一个共享的领域模型。

## 2.4 DOCUMENTS AND DIAGRAMS 文档和图

Whenever I’m in a meeting discussing a software design, I can hardly function without drawing on a whiteboard or sketchpad. A good part of what I draw is UML diagrams, mostly class diagrams or object-interactions.

> 每当我参加讨论软件设计的会议时，如果不在白板或画板上画图，我就很难讨论下去。我画的大部分是 UML 图，主要以类图和对象交互图为主。

Some people are naturally visual, and diagrams help people grasp certain kinds of information. UML diagrams are pretty good at communicating relationships between objects, and they are fair at showing interactions. But they do not convey the conceptual definitions of those objects. In a meeting, I would flesh out those meanings in speech as I sketched the diagram, or they would emerge in a dialog with other participants.

> 有些人天生是视觉动物，图可以帮助人们掌握某些类型的信息。UML 图在传达对象之间的关系上真是游刃有余，而且也很擅长表现交互。但它们却无法给出这些对象的概念定义。在会议中，我会一边画图一边用语言来丰富它们的意义，或者在与其他参与者讨论时进行解释。

Simple, informal UML diagrams can anchor a discussion. Sketch a diagram of three to five objects central to the issue at hand, and everyone can stay focused. Everyone will share a view of the relationships between the objects and, significantly, the objects’ names. The spoken discussion can be more effective with this aid. A diagram can be changed as people try different thought experiments, and the sketch will take on some of the fluidity of spoken words, a true part of the discussion. After all, UML stands for Unified Modeling Language.

> 简单、非正式的 UML 图能够维系整个讨论。绘制一幅包含当前问题最关键的 3 ～ 5 个对象的图，这样每个人都可以集中注意力。所有人就对象关系会达成一致的认识，更重要的是，他们将使用相同的对象名称。如此，口头讨论会更加高效。当人们尝试不同的想法时，图也随之改变，草图在某种程度上可以反映讨论的变化，这是讨论中真正重要的部分。毕竟，UML 就是统一建模语言。

The trouble comes when people feel compelled to convey the whole model or design through UML. A lot of object model diagrams are too complete and, simultaneously, leave too much out. They are too complete because people feel they have to put all the objects that they are going to code into a modeling tool. With all that detail, no one can see the forest for the trees.

> 当人们必须通过 UML 图表示整个模型或设计时，麻烦也随之而来。很多对象模型图在某些方面过于细致，同时在某些方面又有很多遗漏。说它们过于细致是因为人们认为必须将所有要编码的对象都放到建模工具中。而细节过多的结果是“只见树木，不见森林”。

Yet in spite of all that detail, the attributes and relationships are only half the story of an object model. The behavior of those objects and the constraints on them are not so easily illustrated. Object interaction diagrams can illustrate some tricky hotspots in the design, but the bulk of the interactions can’t be shown that way. It is just too much work, both to create the diagrams and to read them. And an interaction diagram can still only imply the purpose behind the model. To include constraints and assertions, UML falls back on text, placed in little brackets, inserted into the diagram.

> 尽管存在所有这些细节，但属性和关系只是对象模型的一部分。这些对象的行为以及这些对象上的约束就不那么容易表示了。对象交互图可以阐明设计中的一些复杂之处，但却无法用这种方式来展示大量的交互，就是工作量太大了，既要制作图，还要学习这些图。而且交互图也只能暗示出模型的目的。要想把约束和断言包括进来，需要在 UML 图中使用文本，这些文本用括号括起来，插入到图中。

The behavioral responsibilities of an object can be hinted at through operation names, and they can be implicitly demonstrated with object interaction (or sequence) diagrams, but they cannot be stated. So, this task falls to supplemental text or conversation. In other words, a UML diagram cannot convey two of the most important aspects of a model: the meaning of the concepts it represents, and what the objects are meant to do. This needn’t trouble us, though, because careful use of English (or Spanish, or whatever) can fill this role pretty well.

> 操作名称可能会暗示出对象的行为职责，对象交互图（或序列图）中也会隐含地展示出这些职责，但无法直接表述。因此，这项任务就要靠补充文本或对话来完成。换言之，UML 图无法传达模型的两个最重要的方面，一个方面是模型所表示的概念的意义，另一方面是对象应该做哪些事情。但是，这并不是大问题，因为通过仔细地使用语言（英语、西班牙语或其他任何一种语言）就可以很好地完成这项任务。

Nor is UML a very satisfying programming language. Every attempt I’ve seen to use the code-generation capabilities of the modeling tools has been counterproductive. If you are constrained by the capabilities of UML, you will often have to leave out the most crucial part of the model because it is some rule that doesn’t fit into a box-and-line diagram. And, of course, a code generator cannot make use of those textual annotations. If you do use some technology that allows executable programs to be written in a UML-like diagramming language, then the UML diagram is reduced to merely another way to view the program itself, and the very meaning of “model” is lost. If you use UML as your implementation language, you will still need other means of communicating the uncluttered model.

> UML 也不是一种十分令人满意的编程语言。我从未见过有人使用建模工具的代码生成功能达到了预期目的。如果 UML 的能力无法满足需要，通常人们就不得不忽略模型最关键的部分，因为有些规则并不适合用线框图来表示。当然，代码生成器也无法使用上面所说的那些文本注释。如果确实能使用 UML 这样的绘图语言来编写可执行程序，那么 UML 图就会退化为程序本身的另一种视图，这样，“模型”的真正含义就丢失了。如果使用 UML 作为实现语言，则仍然需要利用其他手段来表达模型的确切含义。

Diagrams are a means of communication and explanation, and they facilitate brainstorming. They serve these ends best if they are minimal. Comprehensive diagrams of the entire object model fail to communicate or explain; they overwhelm the reader with detail and they lack meaning. This leads us away from the all-encompassing object model diagram, or even the all-encompassing database repository of UML. It leads us toward simplified diagrams of conceptually important parts of the object model that are essential to understanding the design. The diagrams in this book are typical of those I use on projects. They simplify, they explain, and they even incorporate a bit of nonstandard notation when it clarifies their point. They show design constraints, but they are not design specifications in every detail. They represent the skeletons of ideas.

> 图是一种沟通和解释手段，它们可以促进头脑风暴。简洁的小图能够很好地实现这些目标，而涵盖整个对象模型的综合性大图反而失去了沟通或解释能力，因为它们将读者淹没在大量细节之中，加之这些图也缺乏目的性。鉴于此，我们应避免使用包罗万象的对象模型图，甚至不能使用包含所有细节的 UML 数据存储库。相反，应使用简化的图，图中只包含对象模型的重要概念——这些部分对于理解设计至关重要。本书中的图都是我在项目中使用过比较典型的图。它们很简单，而且具有很强的解释能力，在澄清一些要点时，还使用了一些非标准的符号。它们显示了设计约束，但它们不是面面俱到的设计规范。它们只体现了思想纲要。

The vital detail about the design is captured in the code. A well-written implementation should be transparent, revealing the model underlying it. (Making sure that this happens is the subject of the next chapter and much of the rest of this book.) Supplemental diagrams and documents can guide people’s attention to the central points. Natural language discussion can fill in the nuances of meaning. This is why I prefer to turn things inside out from the way a typical UML diagram handles them. Rather than a diagram annotated with text, I write a text document illustrated with selective and simplified diagrams.

> 设计的重要细节应该在代码中体现出来。良好的实现应该是透明的，清楚地展示其背后的模型（下一章及本书其他许多章节的主题就是阐述如何做到这一点）。互为补充的图和文档能够引导人们将注意力放在核心要点上。自然语言的讨论可以填补含义上的细微差别。这就是为什么我喜欢把典型的 UML 使用方法颠倒过来的原因。通常的用法是以图为主，辅以文本注释；而我更愿意以文本为主，用精心挑选的简化图作为说明。

Always remember that the model is not the diagram. The diagram’s purpose is to help communicate and explain the model. The code can serve as a repository of the details of the design. Well-written Java is as expressive as UML in its way. Carefully selected and constructed diagrams can serve to focus attention and aid navigation if they are not obscured by a compulsion to represent the model or design completely.

> 务必要记住模型不是图。图的目的是帮助表达和解释模型。代码可以充当设计细节的存储库。书写良好的 Java 代码与 UML 具有同样的表达能力。经过仔细选择和构造的图可以帮助人们集中注意力，并起到指导作用，当然前提条件是不能强制用图来表示全部模型或设计，因为这样会削弱图的清晰表达的能力。

### 2.4.1 Written Design Documents 书面设计文档

Spoken communication supplements the code’s rigor and detail with meaning. But although talking is critical to connecting everyone to the model, a group of any size will probably need the stability and share-ability of some written documents. But making written documents that actually help the team produce good software is a challenge.

> 口头交流可以解释代码的含义，因此可作为代码精确性和细节的补充。虽然交谈对于将人们与模型联系起来是至关重要的，但书面文档也是必不可少的，任何规模的团队都需要它来提供稳定和共享的交流。但要想编写出能够帮助团队开发出好软件的书面文档却是一个不小的挑战。

Once a document takes on a persistent form, it often loses its connection with the flow of the project. It is left behind by the evolution of the code, or by the evolution of the language of the project.

> 一旦文档的形式变得一成不变，往往会从项目进展流程中脱离出来。它会跟不上代码或项目语言的演变。

Many approaches can work. A few specific documents will be suggested much later, in Part IV of this book, which address particular needs, but I make no attempt to prescribe a set of documents a project should use. Instead, I will offer two general guidelines for evaluating a document.

> 书面文档有很多编写方法。本书第四部分将介绍几种满足特定需要的具体文档，但不会列出项目需要使用的所有文档，而是给出两条用于评估文档的总体原则。

#### Documents Should Complement Code and Speech 文档应作为代码和口头交流的补充

Each Agile process has its own philosophy about documents. Extreme Programming advocates using no extra design documents at all and letting the code speak for itself. Running code doesn’t lie, as any other document might. The behavior of running code is unambiguous.

> 每种敏捷过程在编写文档方面都有自己的理念。极限编程主张完全不使用（多余的）设计文档，而让代码解释自己。实际运行的代码不会说谎，而其他文档则不然。运行代码所产生的行为是明确的。

Extreme Programming concentrates exclusively on the active elements of a program and executable tests. Even comments added to the code do not affect program behavior, so they always fall out of sync with the active code and its driving model. External documents and diagrams do not affect the behavior of the program, so they fall out of sync. On the other hand, spoken communication and ephemeral diagrams on whiteboards do not linger to create confusion. This dependence on the code as communication medium motivates developers to keep the code clean and transparent.

> 极限编程只关注对程序及可执行测试起作用的因素。由于为代码添加的注释并不影响程序的行为，因此它们往往无法与当前代码及其模型保持同步。外部文档和图也不会影响程序的行为，因此它们也无法保持同步。另一方面，口头交流和临时在白板上画的图不会长久保留而产生混淆。依赖代码作为交流媒介可以促使开发人员保持代码的整洁和透明。

But code as a design document does have its limits. It can overwhelm the reader with detail. Although its behavior is unambiguous, that doesn’t mean it is obvious. And the meaning behind a behavior can be hard to convey. In other words, documenting exclusively through code has some of the same basic problems as using comprehensive UML diagrams. Of course, massive spoken communication within the team gives context and guidance around the code, but it is ephemeral and localized. And developers are not the only people who need to understand the model.

> 然而，将代码作为设计文档也有局限性。它可能会把读代码的人淹没在细节中。尽管代码的行为是非常明确的，但这并不意味着其行为是显而易见的。而且行为背后的意义可能难以表达。换言之，只用代码做文档与使用大而全的 UML 图面临着差不多相同的基本问题。当然，团队进行大量的口头交流能够为代码提供上下文和指导，但是，口头交流很短暂，而且范围很小。此外，开发人员并不是唯一需要理解模型的人。

A document shouldn’t try to do what the code already does well. The code already supplies the detail. It is an exact specification of program behavior.

> 文档不应再重复表示代码已经明确表达出的内容。代码已经含有各个细节，它本身就是一种精确的程序行为说明。

Other documents need to illuminate meaning, to give insight into large-scale structures, and to focus attention on core elements. Documents can clarify design intent when the programming language does not support a straightforward implementation of a concept. Written documents should complement the code and the talking.

> 其他文档应该着重说明含义，以便使人们能够深入理解大尺度结构，并将注意力集中在核心元素上。当编程语言无法直接明了地实现概念时，文档可以澄清设计意图。我们应该把书面文档作为代码和口头讨论的补充。

#### Documents Should Work for a Living and Stay Current 文档应当鲜活并保持最新

When I document a model in writing, I diagram small, carefully selected subsets of the model and surround them with text. I define the classes and their responsibilities in words and frame them in a context of meaning as only a natural language can. But the diagram shows some of the choices that have been made in formalizing and paring down the concepts into an object model. These diagrams can be somewhat casual—even hand-drawn. In addition to saving labor, hand-drawn diagrams have the advantage of feeling casual and temporary. These are good things to communicate because they are generally true of our model ideas.

> 我在为模型编写书面文档时，会仔细选择一个小的模型子集来画图，然后让文字放臵在这些图周围。我用文字定义类及其职责，并且像自然语言那样把它们限定在一个语义上下文中。而图显示了在将概念形式化和简化为对象模型的过程中所做的一些选择。这些图可以随意一些，甚至是手绘的。手绘图除了节省工作量，也让人们一看就知道它们是不正式、临时的。这些优点都非常有利于交流，因为它们适用于我们的模型思想。

The greatest value of a design document is to explain the concepts of the model, help in navigating the detail of the code, and perhaps give some insight into the model’s intended style of use. Depending on the philosophy of the team, the whole design document could be as simple as a set of sketches posted on the walls, or it could be substantial.

> 设计文档的最大价值在于解释模型的概念，帮助在代码的细节中指引方向，或许还可以帮助人们深入了解模型预期的使用风格。根据不同的团队理念，整个设计文档可能会十分简单，如只是贴在墙上的一组草图，也可能会非常详尽。

A document must be involved in project activities. The easiest way to judge this is to observe the document’s interaction with the UBIQUITOUS LANGUAGE. Is the document written in the language people speak on the project (now)? Is it written in the language embedded in the code?

> 文档必须深入到各种项目活动中去。判断是否做到这一点的最简单方法，是观察文档与 UBIQUITOUS LANGUAGE 之间的交互。文档是用人们（当前）在项目上讲的语言编写的吗？它是用嵌入到代码中的语言编写的吗？

Listen to the UBIQUITOUS LANGUAGE and how it is changing. If the terms explained in a design document don’t start showing up in conversations and code, the document is not fulfilling its purpose. Maybe the document is too big or complicated. Maybe it is not focused on a sufficiently important topic. People are either not reading it or not finding it compelling. If it is having no impact on the UBIQUITOUS LANGUAGE, something is wrong.

> 注意听 UBIQUITOUS LANGUAGE，观察它是如何变化的。如果设计文档中使用的术语不再出现在讨论和代码中，那么文档就没有起到它的作用。或许是文档太大或太复杂了，或许是它没有关注足够重要的主题。人们要么不阅读文档，要么觉得它索然无味。如果文档对 UBIQUITOUSLANGUAGE 没有影响，那么一定是出问题了。

Conversely, you may hear the UBIQUITOUS LANGUAGE changing naturally while a document is being left behind. Evidently the document does not seem relevant to people or does not seem important enough to update. It could safely be archived as history, but left active it could create confusion and hurt the project. And if a document isn’t playing an important role, keeping it up to date through sheer will and discipline wastes effort.

> 相反，我们会注意到 UBIQUITOUS LANGUAGE 随着文档渐渐过时而自然地改变。显然，要么人们不再关心文档，要么认为它不重要而不再去更新它。这时可以将它作为历史文件安全地归档，如果继续使用这样的文档可能会产生混淆并损害项目。如果文档不再担负重要的作用，那么纯粹靠意志和纪律保持其更新就是浪费精力。

The UBIQUITOUS LANGUAGE allows other documents, such as requirements specifications, to be more concise and less ambiguous. As the domain model comes to reflect the most relevant knowledge of the business, application requirements become scenarios within that model, and the UBIQUITOUS LANGUAGE can be used to describe such a scenario in terms that directly connect to the MODEL-DRIVEN DESIGN (see Chapter 3). As a result, specifications can be written more simply, because they do not have to convey the business knowledge that lies behind the model.

> UBIQUITOUS LANGUAGE 可以使其他文档（如需求规格说明）更简洁和明确。当领域模型反映了与业务最相关的知识时，应用程序的需求成为该模型内部的场景，而 UBIQUITOUSLANGUAGE 可直接用 MODEL-DRIVEN DESIGN（模型驱动设计）的方式描述此类场景（参见第 3 章）。结果就是规格说明的编写更简单，因为它们不必传达模型背后隐含的业务知识。

By keeping documents minimal and focusing them on complementing code and conversation, documents can stay connected to the project. Let the UBIQUITOUS LANGUAGE and its evolution be your guide to choosing documents that live and get woven into the project’s activity.

> 通过将文档减至最少，并且主要用它来补充代码和口头交流，就可以避免文档与项目脱节。根据 UBIQUITOUS LANGUAGE 及其演变来选择那些需要保持更新并与项目活动紧密交互的文档。

### 2.4.2 Executable Bedrock

Now let’s examine the choice of the XP community and some others, to rely almost exclusively on the executable code and its tests. Much of this book discusses ways to make the code convey meaning through a MODEL-DRIVEN DESIGN (see Chapter 3). Well-written code can be very communicative, but the message it communicates is not guaranteed to be accurate. Oh, the reality of the behavior caused by a section of code is inescapable. But a method name can be ambiguous, misleading, or out of date compared to the internals of the method. The assertions in a test are rigorous, but the story told by variable names and the organization of the code is not. Good programming style keeps this connection as direct as possible, but it is still an exercise in self-discipline. It takes fastidiousness to write code that doesn’t just do the right thing but also says the right thing.

> 现在，我们来考查一下 XP 社区和其他一些人为何选择几乎完全依赖可执行代码及其测试。本书主要讨论了如何通过 MODEL-DRIVEN DESIGN 使代码表达出设计的含义（参见第 3 章）。良好的代码具有很强的表达能力，但它所传递的信息不能确保是准确的。一段代码所产生的实际行为是不会改变的。但是，方法名称可能会有歧义、会产生误导或者因为已经过时而无法表示方法的本质含义。测试中的断言是严格的，但变量和代码组织方式所表达出来的意思未必严格。好的编程风格会尽力使这种联系直接化，但其仍然主要靠开发人员的自律。编码时需要一丝不苟的态度，只有这样才能编写出“言行全部正确”的代码。

Elimination of those discrepancies is a major selling point of approaches such as declarative design (discussed in Chapter 10), in which a statement of the purpose of a program element determines its actual behavior in the program. The drive to generate programs from UML is partly motivated by this, though it generally hasn’t worked out well so far.

> 消除这些差异是诸如声明式设计（参见第 10 章）这样的方法的最大优点，在这类方法中，程序元素用途的陈述决定了它在程序中的实际行为。从 UML 生成程序的部分动机就来源于此，虽然目前看来这通常不会得到好的结果。

Still, while even code can mislead, it is closer to the ground than other documents. Aligning the behavior, intent, and message of code using current standard technology requires discipline and a certain way of thinking about design (discussed at length in Part III). To communicate effectively, the code must be based on the same language used to write the requirements—the same language that the developers speak with each other and with domain experts.

> 尽管代码可能会产生误导，但它仍然比其他文档更基础。要想利用当前的标准技术使代码所传达的消息与它的行为和意图保持一致，需要纪律和思考设计的特定方式（第三部分将详细讨论这些问题）。要有效地交流，代码必须基于在编写需求时所使用的同一种语言，也就是开发人员之间、开发人员与领域专家之间进行讨论时所使用的语言。

## 2.5 EXPLANATORY MODELS 解释性模型

The thrust of this book is that one model should underlie implementation, design, and team communication. Having separate models for these separate purposes poses a hazard.

> 本书的核心思想是在实现、设计和团队交流中使用同一个模型作为基础。如果各有各的模型，将会造成危害。

Models can also be valuable as education aids to teach about the domain. The model that drives the design is one view of the domain, but it may aid learning to have other views, used only as educational tools, to communicate general knowledge of the domain. For this purpose, people can use pictures or words that convey other kinds of models unrelated to software design.

> 模型在帮助领域学习方面也具有很大价值。对设计起到推动作用的模型是领域的一个视图，但为了学习领域，还可以引入其他视图，这些视图只用作传递一般领域知识的教学工具。出于此目的，人们可以使用与软件设计无关的其他种类模型的图片或文字。

One particular reason that other models are needed is scope. The technical model that drives the software development process must be strictly pared down to the necessary minimum to fulfill its functions. An explanatory model can include aspects of the domain that provide context that clarifies the more narrowly scoped model.

> 使用其他模型的一个特殊原因是范围。驱动软件开发过程的技术模型必须经过严格的精简，以便用最小化的模型来实现其功能。而解释性模型则可以包含那些提供上下文的领域方面——这些上下文用于澄清范围更窄的模型。

Explanatory models offer the freedom to create much more communicative styles tailored to a particular topic. Visual metaphors used by the domain experts in a field often present clearer explanations, educating developers and harmonizing experts. Explanatory models also present the domain in a way that is simply different, and multiple, diverse explanations help people learn.

> 解释性模型提供了一定的自由度，可以专门为某个特殊主题定制一些表达力更强的风格。领域专家在一个领域中所使用的视觉隐喻通常呈现了更清晰的解释，这可以教给开发人员领域知识，同时使领域专家们的意见更一致。解释性模型还可以以一种不同的方式来呈现领域，并且各种不同角度的解释有助于人们更好地学习。

There is no need for explanatory models to be object models, and it is generally best if they are not. It is actually helpful to avoid UML in these models, to avoid any false impression of correspondence with the software design. Even though the explanatory model and the model that drives design do often correspond, the similarities will seldom be exact. To avoid confusion, everyone must be conscious of the distinction.

> 解释性模型不必是对象模型，而且最好不是。实际上在这些模型中不使用 UML 是有好处的，这样可以避免人们错误地认为这些模型与软件设计是一致的。尽管解释性模型与驱动设计的模型往往有对应关系，但它们并不完全类似。为了避免混淆，每个人都必须知道它们之间的区别。

Example: Shipping Operations and Routes

> 示例航运操作和路线

Consider an application that tracks cargos for a shipping company. The model includes a detailed view of how port operations and vessel voyages are assembled into an operational plan for a cargo (a “route”). But to the uninitiated, a class diagram may not be very illuminating.

> 考虑一个用来追踪航运公司货物的应用程序。模型包含一个详细的视图，它显示了如何将港口装卸和货轮航次组合为一次货运的操作计划（“路线”）。如图 2-4 所示。但对外行而言，类图可能起不到多大的说明作用。

Image
Figure 2.4. A class diagram for a shipping route

In such a case, an explanatory model can help team members understand what the class diagram actually means. Here is another way of looking at the same concepts:

> 在这种情况下，解释性模型可以帮助团队成员理解类图的实际含义。图 2-5 是表示相同概念的另一种方式。

Each line in Figure 2.5 represents either a port operation (loading or unloading the cargo), or cargo sitting in storage on the ground, or cargo sitting on a ship en route. This does not correspond in detail with the class diagram, but it reinforces key points from the domain.

> 图中的每根线段都表示货物的一种状态——或者正在港口装卸（装货或卸货），或者停放在仓库里，或者正在运输途中。这个图并没有与类图中的细节一一对应，但强调了领域的要点。

Image
Figure 2.5. An explanatory model for a shipping route

This sort of diagram, along with natural language explanations of the model it represents, can help developers and domain experts alike understand the more rigorous software model diagrams. Together they are easier to understand than either view alone.

> 这种图连同对它所表示的模型的自然语言解释，能够帮助开发人员和领域专家理解更严格的软件模型图。综合使用这两种图要比单独使用一种图更容易理解。

# 第 3 章 绑定模型和实现

> Three. Binding Model and Implementation

The first thing I saw as I walked through the door was a complete class diagram printed on large sheets of paper that covered a large wall. It was my first day on a project in which smart people had spent months carefully researching and developing a detailed model of the domain. The typical object in the model had intricate associations with three or four other objects, and this web of associations had few natural borders. In this respect, the analysts had been true to the nature of the domain.

> 当我走进办公室，首先映入眼帘的是打印在数张大纸上的完整类图，它铺满了一整面墙。这是我进入某个项目的第一天，在此之前，聪明的项目组成员花费了几个月的时间进行仔细的研究并且开发出了上面这幅详尽的领域模型。该模型中的对象一般都与 3~4 个其他对象有着复杂的关联，而这张关联网几乎没有边界。在这方面，分析人员忠实地反映了领域自身的性质。

As overwhelming as the wall-size diagram was, the model did capture some knowledge. After a moderate amount of study, I learned quite a bit (though that learning was hard to direct—much like randomly browsing the Web). I was more troubled to find that my study gave no insight into the application’s code and design.

> 尽管这张墙面大小的图让人吃不消，但是它所表现的模型确实捕获了一些知识。经过一段时间的研究，我确实从中学到了不少知识（但是这种学习很难找到头绪，更像是在随意地浏览网页）。然而对类图的研究并不能让我深入地了解该应用程序的代码和设计，这让我备感困扰。

When the developers had begun implementing the application, they had quickly discovered that the tangle of associations, although navigable by a human analyst, didn’t translate into storable, retrievable units that could be manipulated with transactional integrity. Mind you, this project was using an object database, so the developers didn’t even have to face the challenges of mapping objects into relational tables. At a fundamental level, the model did not provide a guide to implementation.

> 当开发人员开始实现应用程序时，他们很快就发现，尽管分析人员说得头头是道，他们依然无法将这种错综复杂的关系转换成可存储、可检索的且具有事务完整性的单元。请注意，该项目使用的是对象数据库，也就是说开发人员根本不用考虑对象—关系表映射这种难题。从根本上说，该模型无法为应用程序的实现提供帮助。

Because the model was “correct,” the result of extensive collaboration between technical analysts and business experts, the developers reached the conclusion that conceptually based objects could not be the foundation of their design. So they proceeded to develop an ad hoc design. Their design did use a few of the same class names and attributes for data storage, but it was not based on the existing, or any, model.

> 由于模型是“正确的”，这是经过技术分析人员和业务专家大量协作才得到的结果，因此开发人员得出这样的结论：无法把基于概念的对象作为设计的基础。于是他们开始进行专门针对程序开发的设计。他们的设计确实用了一些原有模型中类和属性的名称进行数据存储，但这种设计并不是建立在任何已有模型的基础上的。

The project had a domain model, but what good is a model on paper unless it directly aids the development of running software?

> 这个项目虽然建立了领域模型，但是如果模型不能直接帮助开发可运行的软件，那么这种纸上谈兵的模型又有什么意义呢？

A few years later, I saw the same end result come from a completely different process. This project was to replace an existing C++ application with a new design implemented in Java. The old application had been hacked together without any regard for object modeling. The design of the old application, if there was one, had accreted as one capability after another had been laid on top of the existing code, without any noticeable generalization or abstraction.

> 几年后，我在一个完全不同的项目中又看到了完全相同的结果。该项目要用 Java 实现新设计，并用新设计替换现存的 C++应用程序。老版本的程序根本没有进行对象建模，仅仅是把功能堆积在一起。老版本的设计（如果有的话）就是在已有代码的基础上一个一个地堆积新功能，完全没有任何泛化或抽象的迹象。

The eerie thing was that the end products of the two processes were very similar! Both had functionality, but were bloated, very hard to understand, and eventually unmaintainable. Though the implementations had, in places, a kind of directness, you couldn’t gain much insight about the purpose of the system by reading the code. Neither process took any advantage of the object paradigm available in their development environment, except as fancy data structures.

> 奇怪的是，这两种开发流程所完成的最终产品却非常相似！它们都充斥了大量功能，难于理解，难以维护。尽管有些程序实现是比较直观的，但是仅通过阅读代码依然无法深入了解该系统的目的所在。除了精心设计的数据结构之外，这两种开发流程都没有利用其开发环境中的面向对象的设计范式。

Models come in many varieties and serve many roles, even those restricted to the context of a software development project. Domain-driven design calls for a model that doesn’t just aid early analysis but is the very foundation of the design. This approach has some important implications for the code. What is less obvious is that domain-driven design requires a different approach to modeling. . . .

> 模型种类繁多，作用各有不同，即使是那些仅用于软件开发项目的模型也是如此。领域驱动设计要求模型不仅能够指导早期的分析工作，还应该成为设计的基础。这种设计方法对于代码的编写有着重要的意义。不太明显的一点就是：领域驱动设计要求一种不同的建模方法……

## 3.1 MODEL-DRIVEN DESIGN 模式：MODEL-DRIVEN DESIGN

The astrolabe, used to compute star positions, is a mechanical implementation of a model of the sky.

> 过去用来计算星体位置的星盘是天空模型的机械实现

Tightly relating the code to an underlying model gives the code meaning and makes the model relevant.

> 严格按照基础模型来编写代码，能够使代码更好地表达设计含义，并且使模型与实际的系统相契合。

A Medieval Sky Computer

> 中世纪的星象电脑

Ancient Greek astronomers devised the astrolabe, which was perfected by medieval Islamic scientists. A rotating web (called a rete) represented the positions of the fixed stars on the celestial sphere. Interchangeable plates engraved with a local spherical coordinate system represented the views from different latitudes. Rotating the rete against the plate enabled a calculation of celestial positions for any time and day of the year. Conversely, given a stellar or solar position, the time could be calculated. The astrolabe was a mechanical implementation of an object-oriented model of the sky.

> 中世纪的星象电脑星盘是由古希腊的天文学家发明的；在中世纪，伊斯兰科学家又对它进行了改进。星盘上可旋转的铜环（又称“网环”）代表各恒星在天球上的位置。刻有当地地平坐标系的盘面是可换的，它代表的是不同纬度的星空景象。在星盘盘面上旋转网环，可以计算出全年任何时刻的天体位置。反过来，如果知道太阳或某个恒星的位置，也可以用星盘算出时间。星盘以机械化的方式实现了代表星空的面向对象模型。

---

Projects that have no domain model at all, but just write code to fulfill one function after another, gain few of the advantages of knowledge crunching and communication discussed in the previous two chapters. A complex domain will swamp them.

> 那些压根儿就没有领域模型的项目，仅仅通过编写代码来实现一个又一个的功能，它们无法利用前两章所讨论的知识消化和沟通所带来的好处。如果涉及复杂的领域就会使项目举步维艰。

On the other hand, many complex projects do attempt some sort of domain model, but they don’t maintain a tight connection between the model and the code. The model they develop, possibly useful as an exploratory tool at the outset, becomes increasingly irrelevant and even misleading. All the care lavished on the model provides little reassurance that the design is correct, because the two are different.

> 另一方面，许多复杂项目确实在尝试使用某种形式的领域模型，但是并没有把代码的编写与模型紧密联系起来。这些项目所设计的模型，在项目初期还可能用来做一些探索工作，但是随着项目的进展，这些模型与项目渐行渐远，甚至还会起误导作用。所有在模型上花费的精力都无法保证程序设计的正确性，因为模型和设计是不同的。

This connection can break down in many ways, but the detachment is often a conscious choice. Many design methodologies advocate an analysis model, quite distinct from the design and usually developed by different people. It is called an analysis model because it is the product of analyzing the business domain to organize its concepts without any consideration of the part it will play in a software system. An analysis model is meant as a tool for understanding only; mixing in implementation concerns is thought to muddy the waters. Later, a design is created that may have only a loose correspondence to the analysis model. The analysis model is not created with design issues in mind, and therefore it is likely to be quite impractical for those needs.

> 模型和程序设计之间的联系可能在很多情况下被破坏，但是二者的这种分离往往是有意而为之的。很多设计方法都提倡使用完全脱离于程序设计的分析模型，并且通常这二者是由不同的人员开发的。之所以称其为分析模型，是因为它是对业务领域进行分析的结果，它在组织业务领域中的概念时，完全不去考虑自己在软件系统中将会起到的作用。分析模型仅仅是理解工具，人们认为把它与程序实现联系在一起无异于搅浑一池清水。随后的程序设计与分析模型之间可能仅仅保持一种松散的对应关系。在创建分析模型时并没有考虑程序设计的问题，因此分析模型很有可能无法满足程序设计的需求。

Some knowledge crunching happens during such an analysis, but most of it is lost when coding begins, when the developers are forced to come up with new abstractions for the design. Then there is no guarantee that the insights gained by the analysts and embedded in the model will be retained or rediscovered. At this point, maintaining any mapping between the design and the loosely connected model is not cost-effective.

> 这种分析中会有一些知识消化的过程，但是在编码开始后，如果开发人员不得不重新对设计进行抽象，那么大部分的领域知识就会被丢弃。如此一来，就不能保证在新的程序设计中还能保留或者重现分析人员所获得的并且嵌入在模型中的领域知识。到了这一步，要维护程序设计和松散连接的模型之间的对应关系就很不合算了。

The pure analysis model even falls short of its primary goal of understanding the domain, because crucial discoveries always emerge during the design/implementation effort. Very specific, unanticipated problems always arise. An up-front model will go into depth about some irrelevant subjects, while it overlooks some important subjects. Other subjects will be represented in ways that are not useful to the application. The result is that pure analysis models get abandoned soon after coding starts, and most of the ground has to be covered again. But the second time around, if the developers perceive analysis to be a separate process, modeling happens in a less disciplined way. If the managers perceive analysis to be a separate process, the development team may not be given adequate access to domain experts.

> 纯粹的分析模型甚至在实现理解领域这一主要目的方面也捉襟见肘，因为在程序设计和实现过程中总是会发现一些关键的知识点，而细节问题则会出人意料地层出不穷。前期模型可能会深入研究一些不相关的问题，反而忽略了一些重要的方面。而且它对于其他问题的描述也可能对应用程序没有任何帮助。最后的结果就是：编码工作一开始，纯粹的分析模型就被抛到一边，大部分的模型都需要重新设计。即便是重新设计，如果开发人员认为分析与程序开发毫不相关，那么建模过程就不会那么规范。而如果项目经理也这么认为，那么开发团队可能没有足够的机会与领域专家进行交流。

Whatever the cause, software that lacks a concept at the foundation of its design is, at best, a mechanism that does useful things without explaining its actions.

> 无论是什么原因，软件的设计如果缺乏概念，那么软件充其量不过是一种机械化的产品——只实现有用的功能却无法解释操作的原因。

If the design, or some central part of it, does not map to the domain model, that model is of little value, and the correctness of the software is suspect. At the same time, complex mappings between models and design functions are difficult to understand and, in practice, impossible to maintain as the design changes. A deadly divide opens between analysis and design so that insight gained in each of those activities does not feed into the other.

> 如果整个程序设计或者其核心部分没有与领域模型相对应，那么这个模型就是没有价值的，软件的正确性也值得怀疑。同时，模型和设计功能之间过于复杂的对应关系也是难于理解的，在实际项目中，当设计改变时也无法维护这种关系。若分析与和设计之间产生严重分歧，那么在分析和设计活动中所获得的知识就无法彼此共享。

An analysis must capture fundamental concepts from the domain in a comprehensible, expressive way. The design has to specify a set of components that can be constructed with the programming tools in use on the project that will perform efficiently in the target deployment environment and will correctly solve the problems posed for the application.

> 分析工作一定要抓住领域内的基础概念，并且用易于理解和易于表达的方式描述出来。设计工作则需要指定一套可以由项目中使用的编程工具创建的组件，使项目可以在目标部署环境中高效运行，并且能够正确解决应用程序所遇到的问题。

MODEL-DRIVEN DESIGN discards the dichotomy of analysis model and design to search out a single model that serves both purposes. Setting aside purely technical issues, each object in the design plays a conceptual role described in the model. This requires us to be more demanding of the chosen model, since it must fulfill two quite different objectives.

> MODEL-DRIVEN DESIGN（模型驱动设计）不再将分析模型和程序设计分离开，而是寻求一种能够满足这两方面需求的单一模型。不考虑纯粹的技术问题，程序设计中的每个对象都反映了模型中所描述的相应概念。这就要求我们以更高的标准来选择模型，因为它必须同时满足两种完全不同的目标。

There are always many ways of abstracting a domain, and there are always many designs that can solve an application problem. This is what makes it practical to bind the model and design. This binding mustn’t come at the cost of a weakened analysis, fatally compromised by technical considerations. Nor can we accept clumsy designs, reflecting domain ideas but eschewing software design principles. This approach demands a model that works well as both analysis and design. When a model doesn’t seem to be practical for implementation, we must search for a new one. When a model doesn’t faithfully express the key concepts of the domain, we must search for a new one. The modeling and design process then becomes a single iterative loop.

> 有很多方法可以对领域进行抽象，也有很多种设计可以解决应用程序的问题。因此，绑定模型和程序设计是切实可行的。但是这种绑定不能够因为技术考虑而削弱分析的功能，我们也不能接受那些只反映了领域概念却舍弃了软件设计原则的拙劣设计。模型和设计的绑定需要的是在分析和程序设计阶段都能发挥良好作用的模型。如果模型对于程序的实现来说显得不太实用时，我们必须重新设计它。而如果模型无法忠实地描述领域的关键概念，也必须重新设计它。这样，建模和程序设计就结合为一个统一的迭代开发过程。

The imperative to relate the domain model closely to the design adds one more criterion for choosing the more useful models out of the universe of possible models. It calls for hard thinking and usually takes multiple iterations and a lot of refactoring, but it makes the model relevant.

> 将领域模型和程序设计紧密联系在一起绝对是必要的，这也使得在众多可选模型中选择最适用的模型时，又多了一条选择标准。它要求我们认真思考，并且通常会经过多次反复修改和重新构建的过程，但是通过这样的过程可以得到与设计关联的模型。

Therefore:

> 因此：

Design a portion of the software system to reflect the domain model in a very literal way, so that mapping is obvious. Revisit the model and modify it to be implemented more naturally in software, even as you seek to make it reflect deeper insight into the domain. Demand a single model that serves both purposes well, in addition to supporting a robust UBIQUITOUS LANGUAGE.

> 软件系统各个部分的设计应该忠实地反映领域模型，以便体现出这二者之间的明确对应关系。我们应该反复检查并修改模型，以便软件可以更加自然地实现模型，即使想让模型反映出更深层次的领域概念时也应如此。我们需要的模型不但应该满足这两种需求，还应该能够支持健壮的 UBIQUITOUS LANGUAGE（通用语言）。

Draw from the model the terminology used in the design and the basic assignment of responsibilities. The code becomes an expression of the model, so a change to the code may be a change to the model. Its effect must ripple through the rest of the project’s activities accordingly.

> 从模型中获取用于程序设计和基本职责分配的术语。让程序代码成为模型的表达，代码的改变可能会是模型的改变。而其影响势必要波及接下来相应的项目活动。

To tie the implementation slavishly to a model usually requires software development tools and languages that support a modeling paradigm, such as object-oriented programming.

> 完全依赖模型的实现通常需要支持建模范式的软件开发工具和语言，比如面向对象的编程。

Sometimes there will be different models for different subsystems (see Chapter 14), but only one model should apply to a particular part of the system, throughout all aspects of the development effort, from the code to requirements analysis.

> 有时，不同的子系统会有不同的模型（参见第 14 章），但是从需求分析到代码编写的整个开发过程中，软件系统的每一部分只能对应一个模型。

The single model reduces the chances of error, because the design is now a direct outgrowth of the carefully considered model. The design, and even the code itself, has the communicativeness of a model.

> 单一模型能够减少出错的概率，因为程序设计直接来源于经过仔细考虑而创建的模型。程序设计，甚至是代码本身，都与模型密不可分。

---

Developing a single model that captures the problem and provides a practical design is easier said than done. You can’t just take any model and turn it into a workable design. The model has to be carefully crafted to make for a practical implementation. Design and implementation techniques have to be employed that allow code to express a model effectively (see Part II). Knowledge crunchers explore model options and refine them into practical software elements. Development becomes an iterative process of refining the model, the design, and the code as a single activity (see Part III).

> 要想创建出能够抓住主要问题并且帮助程序设计的单一模型并没有说的那么容易。我们不可能随手抓个模型就把它转化成可使用的设计。只有经过精心设计的模型才能促成切实可行的实现。想要使代码有效地描述模型就需要用到程序设计和实现的技巧（参见第二部分）。知识消化人员需要研究模型的各个选项，并将它们细化为实用的软件元素。软件开发于是就成了一个不断精化模型、设计和代码的统一的迭代过程（参见第三部分）。

## 3.2 MODELING PARADIGMS AND TOOL SUPPORT 建模范式和工具支持

To make a MODEL-DRIVEN DESIGN pay off, the correspondence must be literal, exact within bounds of human error. To make such a close correspondence of model and design possible, it is almost essential to work within a modeling paradigm supported by software tools that allow you to create direct analogs to the concepts in the model.

> 为了使 MODEL-DRIVEN DESIGN 发挥作用，一定要在可控范围内严格保证模型与设计之间的一致性。要实现这种严格的一致性，必须要运用由软件工具支持的建模范式，它可以在程序中直接创建模型中的对应概念。

Image
Figure 3.1

Object-oriented programming is powerful because it is based on a modeling paradigm, and it provides implementations of the model constructs. As far as the programmer is concerned, objects really exist in memory, they have associations with other objects, they are organized into classes, and they provide behavior available by messaging. Although many developers benefit from just applying the technical capabilities of objects to organize program code, the real breakthrough of object design comes when the code expresses the concepts of a model. Java and many other tools allow the creation of objects and relationships directly analogous to conceptual object models.

> 面向对象编程之所以功能强大，是因为它基于建模范式，并且为模型构造提供了实现方式。如图 3-1 所示。从程序员的角度来看，对象真实存在于内存中，它们与其他对象相互联系，它们被组织成类，并且通过消息传递来完成相应的行为。许多开发人员只是得益于对象的技术能力——用其组织程序代码，只有用代码表达模型概念时，对象设计的真正突破之处才彰显出来。Java 和许多其他工具都允许创建直接反映概念对象模型的对象和关系。

Although it has never reached the mass usage that object-oriented languages have, the Prolog language is a natural fit for MODEL-DRIVEN DESIGN. In this case, the paradigm is logic, and the model is a set of logical rules and facts they operate on.

> Prolog 语言并不像面向对象语言那样被广泛使用，但是它却非常适合 MODEL-DRIVENDESIGN。在 MODEL-DRIVEN DESIGN 中，建模范式是逻辑的，而模型则是一组逻辑规则以及这些规则所操作的事实。

MODEL-DRIVEN DESIGN has limited applicability using languages such as C, because there is no modeling paradigm that corresponds to a purely procedural language. Those languages are procedural in the sense that the programmer tells the computer a series of steps to follow. Although the programmer may be thinking about the concepts of the domain, the program itself is a series of technical manipulations of data. The result may be useful, but the program doesn’t capture much of the meaning. Procedural languages often support complex data types that begin to correspond to more natural conceptions of the domain, but these complex types are only organized data, and they don’t capture the active aspects of the domain. The result is that software written in procedural languages has complicated functions linked together based on anticipated paths of execution, rather than by conceptual connections in the domain model.

> 像 C 这样的语言并不适用于 MODEL-DRIVEN DESIGN，因为没有适用于纯粹过程语言的建模范式。对过程语言而言，程序员要告诉电脑一系列要执行的操作步骤。尽管程序员也会考虑到领域中的概念，但是程序本身仅仅是一组对数据进行的技术操作。最终程序可能是实用的，但是它并没有包含太多的意义。过程语言通常支持复杂的数据类型，这些数据类型一开始就能很自然地对应到领域中的概念上，但是它们也只是被组织在一起的数据，并不能描述领域的活跃方面。因此，用过程语言编写的软件具有复杂的函数，这些函数基于预先制定的执行路径连接在一起，而不是通过领域模型中的概念联系进行连接的。

Before I ever heard of object-oriented programming, I wrote FORTRAN programs to solve mathematical models, which is just the sort of domain in which FORTRAN excels. Mathematical functions are the main conceptual component of such a model and can be cleanly expressed in FORTRAN. Even so, there is no way to capture higher level meaning beyond the functions. Most non-mathematical domains don’t lend themselves to MODEL-DRIVEN DESIGN in procedural languages because the domains are not conceptualized as math functions or as steps in a procedure.

> 在我还没听说面向对象编程的时候，我是通过 Fortran 程序来实现数学模型的，这也正是 Fortran 所擅长的领域。数学函数是这种模型中主要的概念组件，也是 Fortran 语言能够清晰描述的。即便如此，对于超越函数的更高层次的意义，Fortran 就毫无办法了。大部分非数学领域都不适合用过程语言来进行 MODEL-DRIVEN DESIGN，因为这些领域无法被抽象成数学函数或者过程中的操作步骤。

Object-oriented design, the paradigm that currently dominates the majority of ambitious projects, is the approach used primarily in this book.

> 面向对象设计是目前大多数项目所使用的建模范式，也是本书中使用的主要方法。

Example: From Procedural to MODEL-DRIVEN

> 示例从过程设计到 MODEL-DRIVEN DESIGN

As discussed in Chapter 1, a printed circuit board (PCB) can be viewed as a collection of electrical conductors (called nets) connecting the pins of various components. There are often tens of thousands of nets. Special software, called a PCB layout tool, finds a physical arrangement for all the nets so that they don’t cross or interfere with each other. It does this by optimizing their paths while satisfying an enormous number of constraints placed by the human designers that restrict the way they can be laid out. Although PCB layout tools are very sophisticated, they still have some shortcomings.

> 第 1 章讲过，我们可以把 PCB 看作是连接各种电路元件引脚的导体（称为 net）集合。电路板上通常都会有成千上万个 net。有一种叫做 PCB 布线工具的专用软件，能够为所有 net 安排物理布线，而不会使它们相互交叉或干扰。它的实现方法就是根据设计者规定的大量限制条件来限制布线方式以及优化路径选择。尽管 PCB 布线工具已经非常先进了，但是它仍然有一些缺陷。

One problem is that each of these thousands of nets has its own set of layout rules. PCB engineers see many nets as belonging to natural groupings that should share the same rules. For example, some nets form buses.

> 其中一个问题是这些数以千计的 net 都拥有各自的布线规则，而 PCB 工程师会根据 net 自身的性质将其分组，同组的 net 共用相同的规则。比如，有些 net 构成了总线。如图 3-2 所示。

Image
Figure 3.2. An explanatory diagram of buses and nets

By lumping nets into a bus, perhaps 8 or 16 or 256 at a time, the engineer cuts the job down to a more manageable size, improving productivity and reducing errors. The trouble is, the layout tool has no such concept as a bus. Rules have to be assigned to tens of thousands of nets, one net at a time.

> 工程师每次用 8 个、16 个或者 256 个 net 组合成总线，这样布线工作就更易于管理了，不但提高了效率也减少了错误。问题是布线工具中没有类似于总线这样的概念。布线规则不得不应用于成千上万个 net，一次处理一个 net。

A Mechanistic Design

> 呆板的设计

Desperate engineers worked around this limitation in the layout tool by writing scripts that parse the layout tool’s data files and insert rules directly into the file, applying them to an entire bus at a time.

> 走投无路的工程师只能用变通方法绕过布线工具的限制，编写脚本来分析布线工具的数据文件，然后将规则直接插入到文件中，从而一次性将规则应用于整个总线。

The layout tool stores each circuit connection in a net list file, which looks something like this:

> 布线工具在 net 列表文件中存储每个电路连接，如下所示：

```
Net Name    Component.Pin
--------    -------------
Xyz0        A.0, B.0
Xyz1        A.1, B.1
Xyz2        A.2, B.2
. . .
```

It stores the layout rules in a file format something like this:

> 而布线规则被存储在类似于下面格式的文件中：

```
Net Name    Rule Type        Parameters
--------    ---------        ----------
Xyz1        min_linewidth    5
Xyz1        max_delay        15
Xyz2        min_linewidth    5
Xyz2        max_delay        15
. . .
```

The engineers carefully use a naming convention for the nets so that an alphabetical sort of the data file will place the nets of a bus together in a sorted file. Then their script can parse the file and modify each net based on its bus. Actual code to parse, manipulate, and write the files is just too verbose and opaque to serve this example, so I’ll just list the steps in the procedure.

> 工程师为 net 制定严格的命名约定，这样将数据文件的内容按照字母排序，就可以使构成同一条总线的所有 net 都排列在一起。然后他们编写的脚本就可以解析该文件并且基于总线来修改每个 net。用来解析、处理和写入文件的实际代码太过冗长晦涩，对解释这个例子没有什么帮助，所以我在下面只列出了这个处理过程中要执行的步骤。

1. Sort net list file by net name.
2. Read each line in file, seeking first one that starts with bus name pattern.
3. For each line with matching name, parse line to get net name.
4. Append net name with rule text to rules file.
5. Repeat from 3 until left of line no longer matches bus name.

---

> 1. 按照 net 名称将 net 列表文件排序。
> 2. 逐行读取文件，寻找以总线名称开头的第一行数据。
> 3. 解析名称匹配的每一行，获取每行中 net 的名称。
> 4. 将 net 名称和规则文本附加到规则文件的末尾。
> 5. 从第（3）步起重复执行，直到没有匹配该总线名称的行。

So the input of a bus rule such as this:

> 总线规则的输入文件采用如下的格式：

```
Bus Name    Rule Type        Parameters
--------    ---------        ----------
Xyz         max_vias         3
```

would result in adding net rules to the file like these:

> 经过处理后，输出的是添加了 net 规则的文件，如下所示：

```
Net Name    Rule Type        Parameters
--------    ---------        ----------
. . .
Xyz0        max_vias         3
Xyz1        max_vias         3
Xyz2        max_vias         3
. . .
```

I imagine that the person who first wrote such a script had only this simple need, and if this were the only requirement, a script like this would make a lot of sense. But in practice, there are now dozens of scripts. They could, of course, be refactored to share sorting and string matching functions, and if the language supported function calls to encapsulate the details, the scripts could begin to read almost like the summary steps above. But still, they are just file manipulations. A different file format (and there are several) would require starting from scratch, even though the concept of grouping buses and applying rules to them is the same. If you wanted richer functionality or interactivity, you would have to pay for every inch.

> 我猜想第一个编写这个脚本的人只有这种简单的需求，如果情况确实如此，那么使用这样的脚本是完全合理的。但实际情况是，已经存在成堆的脚本了。当然，可以通过重构来共用排序及字符串匹配之类的函数，而且如果脚本语言支持通过函数调用来封装细节，那么这些脚本看上去会和上面给出的步骤差不多。但是，它们依然只是对文件进行操作。文件格式一有不同（确实有几种）就需要重新编写一套程序，即便是总线分组以及为其分配规则的概念是相同的。如果你想要实现更多的功能和交互，就得下血本。

What the script writers were trying to do was to supplement the tool’s domain model with the concept of “bus.” Their implementation infers the bus’s existence through sorts and string matches, but it does not explicitly deal with the concept.

> 脚本的编写者试图在布线工具的领域模型中补充“总线”这个概念，他们的脚本通过排序和字符串匹配来判断总线的存在，却没有明确地定义总线概念。

A Model-Driven Design

> MODEL-DRIVEN DESIGN

The preceding discussion has already described the concepts the domain experts use to think about their problems. Now we need to organize those concepts explicitly into a model we can base software on.

> 前面我们已经描述了领域专家思考问题时所使用的概念。现在需要将这些概念组织成模型，作为软件开发的基础。

Image
Figure 3.3. A class diagram oriented toward efficient assignment of layout rules

With these objects implemented in an object-oriented language, the core functionality becomes almost trivial.

> 用面向对象的语言实现上图的这些对象后，核心功能的实现会变得轻而易举。

The `assignRule()` method can be implemented on Abstract Net. The `assignedRules()` method on Net takes its own rules and its Bus’s rules.

> 方法 `assignRule()` 可以在抽象类 AbstractNet 中实现。而类 Net 中的方法 `assignedRules()` 则分配了其自身的规则以及类 Bus 的规则。

```java
abstract class AbstractNet {
    private Set rules;

    void assignRule(LayoutRule rule) {
        rules.add(rule);
    }

    Set assignedRules() {
        return rules;
    }
}

class Net extends AbstractNet {
    private Bus bus;

    Set assignedRules() {
        Set result = new HashSet();
        result.addAll(super.assignedRules());
        result.addAll(bus.assignedRules());
        return result;
    }
}
```

Of course, there would be a great deal of supporting code, but this covers the basic functionality of the script.

> 当然，程序还需要大量的支持代码，但上面的代码片段已经呈现了脚本的基本功能。

The application requires import/export logic, which we’ll encapsulate into some simple services.

> 这个程序还需要导入/导出逻辑，我们可以将其封装成一些简单的服务。

Image
We’ll also need a few utilities:

> 我们还需要几个工具类：

Image
Now, starting the application is a matter of initializing the repositories with imported data:

> 现在，启动应用程序，用导入数据来初始化 Net 和 Bus 仓库。

```java
Collection nets = NetListImportService.read(aFile);
NetRepository.addAll(nets);
Collection buses = InferredBusFactory.groupIntoBuses(nets);
BusRepository.addAll(buses);
```

Each of the services and repositories can be unit-tested. Even more important, the core domain logic can be tested. Here is a unit test of the most central behavior (using the JUnit test framework):

> 上面提到的服务和仓库都可以进行单元测试。更重要的是还可以测试核心领域逻辑。下面是对最核心的行为进行的单元测试（采用了 JUnit 测试框架）：

```java
public void testBusRuleAssignment() {
    Net a0 = new Net("a0");
    Net a1 = new Net("a1");
    Bus a = new Bus("a"); //Bus is not conceptually dependent
    a.addNet(a0);         //on name-based recognition, and so
    a.addNet(a1);         //its tests should not be either.

    NetRule minWidth4 = NetRule.create(MIN_WIDTH, 4);
    a.assignRule(minWidth4);

    assertTrue(a0.assignedRules().contains(minWidth4));
    assertEquals(minWidth4, a0.getRule(MIN_WIDTH));
    assertEquals(minWidth4, a1.getRule(MIN_WIDTH));
}
```

An interactive user interface could present a list of buses, allowing the user to assign rules to each, or it could read from a file of rules for backward compatibility. A façade makes access simple for either interface. Its implementation echoes the test:

> 程序应该有一个交互式的用户界面，可以列出所有总线，让用户逐个指定规则；或者可以向后兼容，从规则文件中读取规则。采用外观（façade）模式可以更容易地访问这些接口，如下代码是对应于上面测试的实现代码：

```java
public void assignBusRule(String busName, String ruleType,
      double parameter){
   Bus bus = BusRepository.getByName(busName);
   bus.assignRule(NetRule.create(ruleType, parameter));
}
```

Finishing:

> 最后一行代码：

```java
NetRuleExport.write(aFileName, NetRepository.allNets());
```

(The service asks each Net for `assignedRules()`, and then writes them fully expanded.)

> （这项服务调用每个 Net 的 `assignedRules()` 方法，然后将所有规则完全写入规则文件。）

Of course, if there were only one operation (as in the example), the script-based approach might be just as practical. But in reality, there were 20 or more. The MODEL-DRIVEN DESIGN scales easily and can include constraints on combining rules and other enhancements.

> 当然，如果只有一种操作（就像这个例子一样），那么基于脚本的处理方式可能也同样实用。但实际上，通常会需要 20 个甚至更多的操作。MODEL-DRIVEN DESIGN 易于扩展，能够为规则的组合设臵限制条件，还能提供其他的一些增强功能。

The second design also accommodates testing. Its components have well-defined interfaces that can be unit-tested. The only way to test the script is to do an end-to-end file-in/file-out comparison.

> MODEL-DRIVEN DESIGN 也为测试提供了方便。它的组件都具有定义完善的接口，可以进行单元测试。而测试脚本程序的唯一方法就是基于文件进行端到端的比较。

Keep in mind that such a design does not emerge in a single step. It would take several iterations of refactoring and knowledge crunching to distill the important concepts of the domain into a simple, incisive model.

> 记住，这样的设计不是一蹴而就的。我们需要反复研究领域知识，不断重构模型，才能将领域中重要的概念提炼成简单而清晰的模型。

## 3. LETTING THE BONES SHOW: WHY MODELS MATTER TO USERS 揭示主旨：为什么模型对用户至关重要

In theory, perhaps, you could present a user with any view of a system, regardless of what lies beneath. But in practice, a mismatch causes confusion at best—bugs at worst. Consider a very simple example of how users are misled by superimposed models of bookmarks for Web sites in current releases of Microsoft Internet Explorer.1

> 从理论上讲，也许你可以向用户展示任何一种系统视图，而不管底层如何实现。但实际上，系统上下层结构的不匹配轻则导致误解，重则产生 bug。让我们看一个非常简单的例子——微软 IE 浏览器的早期版中，网站书签功能对应的模型是如何误导用户的。

A user of Internet Explorer thinks of “Favorites” as a list of names of Web sites that persist from session to session. But the implementation treats a Favorite as a file containing a URL, and whose filename is put in the Favorites list. That’s a problem if the Web page title contains characters that are illegal in Windows filenames. Suppose a user tries to store a Favorite and types the following name for it: “Laziness: The Secret to Happiness”. An error message will say: “A filename cannot contain any of the following characters: `\ / : * ? " < > | ”`. What filename? On the other hand, if the Web page title already contains an illegal character, Internet Explorer will just quietly strip it out. The loss of data may be benign in this case, but not what the user would have expected. Quietly changing data is completely unacceptable in most applications.

> IE 浏览器用户会认为“收藏夹”是存储网站名称的列表，网站名称在不同的会话中是保持不变的。但是系统实现却将收藏夹中的书签当作一个包含 URL 的文件，并将文件名称存储在收藏夹列表中。这样做的问题是，如果网页标题含有 Windows 系统文件名不能接受的非法字符，就会出现错误。假如用户想要收藏某页面并将其命名为：“Laziness: The Secret to Happiness”（懒惰：幸福的秘密），就会弹出一个错误信息：“文件名不能包含下列任何字符：\ / : \* ? " < >|”。用户会奇怪文件名是指什么。另一方面，如果网页标题已经包含非法字符，IE 浏览器则会悄悄地把字符删除。这种数据丢失在这种情况下也许危害不大，但绝不是用户所期望的。在大多数应用中，程序悄悄地修改数据是不能接受的。

MODEL-DRIVEN DESIGN calls for working with only one model (within any single context, as will be discussed in Chapter 14). Most of the advice and examples go to the problems of having separate analysis models and design models, but here we have a problem arising from a different pair of models: the user model and the design/implementation model.

> MODEL-DRIVEN DESIGN 要求只使用一个模型（在任何一个上下文中都是如此，第 14 章会讨论这一点）。大部分的设计建议和例子都只针对将分析模型和设计模型分离的问题，但是这里的问题涉及了另外一对不同的模型：用户模型和设计/实现模型。

Of course, an unadorned view of the domain model would definitely not be convenient for the user in most cases. But trying to create in the UI an illusion of a model other than the domain model will cause confusion unless the illusion is perfect. If Web Favorites are actually just a collection of shortcut files, then expose this fact to the user and eliminate the confusing alternative model. Not only will the feature be less confusing, but the user can then leverage what he knows about the file system to deal with Web Favorites. He can reorganize them with the File Explorer, for example, rather than use awkward tools built into the Web browser. Informed users would be more able to exploit the flexibility of storing Web shortcuts anywhere in the file system. Just by removing the misleading extra model, the power of the application would increase and become clearer. Why make the user learn a new model when the programmers felt the old model was good enough?

> 当然，大多数情况下，没有经过处理的领域模型视图肯定不便于用户使用。但是在用户界面中出现与领域模型不同的“影像”将会使用户产生迷惑，除非这个“影像”完美无缺。如果网站收藏夹实际上只是快捷方式文件的集合，那么应该将这一事实告诉用户，还应该删除之前那个起误导作用的模型。这样不但能使收藏夹的功能更加清晰，用户还可以利用自己所知道的文件系统的知识来对网站收藏夹进行操作。比如，用户可以用资源管理器来重新组织已收藏的文件，而不是用浏览器内臵的拙劣工具。而电脑高手还能够灵活地在文件系统的任何位臵存储网页快捷方式。仅仅通过删除起误导作用的多余模型就可以让应用程序的功能更加强大且清晰。如果程序员认为原有模型足够好，那么为什么还要让用户学习新模型呢？

Alternatively, store the Favorites in a different way, say in a data file, so that they can be subject to their own rules. Those rules would presumably be the naming rules that apply to Web pages. That would again provide a single model. This one tells the user that everything he knows about naming Web sites applies to Favorites.

> 此外，如果以不同的方式来存储收藏夹，比如将其存储在一个数据文件中，这样收藏文件就可以有自己的规则了。这些规则很可能是应用于网页的命名规则。这又是一个单一模型。这个模型告诉用户所有关于网站的命名规则都适用于网站收藏夹。

When a design is based on a model that reflects the basic concerns of the users and domain experts, the bones of the design can be revealed to the user to a greater extent than with other design approaches. Revealing the model gives the user more access to the potential of the software and yields consistent, predictable behavior.

> 如果程序设计基于一个能够反映出用户和领域专家所关心的基本问题的模型，那么与其他设计方式相比，这种设计可以将其主旨更明确地展示给用户。让用户了解模型，将使他们有更多机会挖掘软件的潜能，也能使软件的行为合乎情理、前后一致。

## 3.4 HANDS-ON MODELERS 模式：HANDS-ON MODELER

Manufacturing is a popular metaphor for software development. One inference from this metaphor: highly skilled engineers design; less skilled laborers assemble the products. This metaphor has messed up a lot of projects for one simple reason—software development is all design. All teams have specialized roles for members, but overseparation of responsibility for analysis, modeling, design, and programming interferes with MODEL-DRIVEN DESIGN.

> 人们总是把软件开发比喻成制造业。这个比喻的一个推论是：经验丰富的工程师做设计工作，而技能水平较低的劳动力负责组装产品。这种做法使许多项目陷入困境，原因很简单——软件开发就是设计。虽然开发团队中的每个成员都有自己的职责，但是将分析、建模、设计和编程工作过度分离会对 MODEL-DRIVEN DESIGN 产生不良影响。

On one project, my job was to coordinate different application teams and help develop the domain model that would drive the design. But the management thought that modelers should be modeling, and that coding was a waste of those skills, so I was in effect forbidden to program or work on details with programmers.

> 我曾经在一个项目中负责协调不同的应用程序开发团队，帮助开发可以驱动程序设计的领域模型。但是管理层认为建模人员就应该只负责建模工作，编写代码就是在浪费这种技能，于是他们不准我编写代码或者与程序员讨论细节问题。

Things seemed to be OK for a while. Working with domain experts and the development leads of the different teams, we crunched knowledge and refined a nice core model. But that model was never put to work, for two reasons.

> 开始项目进展的还算顺利。我和领域专家以及各团队的开发负责人共同工作，消化领域知识并提炼出了一个不错的核心模型。但是该模型却从来没有派上用场，原因有两个。

First, some of the model’s intent was lost in the handoff. The overall effect of a model can be very sensitive to details (as will be discussed in Parts II and III), and those details don’t always come across in a UML diagram or a general discussion. If I could have rolled up my sleeves and worked with the other developers directly, providing some code to follow as examples, and providing some close support, the team could have taken up the abstractions of the model and run with them.

> 其一，模型的一些意图在其传递过程中丢失了。模型的整体效果受细节的影响很大（这将在第二部分和第三部分讨论），这些细节问题并不是总能在 UML 图或者一般讨论中遇到的。如果我能撸起袖子，直接与开发人员共同工作，提供一些参考代码和近距离的技术支持，那么他们也许能够理解模型中的抽象概念并据此进行开发。

The other problem was the indirectness of feedback from the interaction of the model with the implementation and the technology. For example, certain aspects of the model turned out to be wildly inefficient on our technology platform, but the full implications didn’t trickle back to me for months. Relatively minor changes could have fixed the problem, but by then it didn’t matter. The developers were well on their way to writing software that did work—without the model, which had been reduced to a mere data structure, wherever it was still used at all. The developers had thrown the baby out with the bathwater, but what choice did they have? They could no longer risk being saddled with the dictates of the architect in the ivory tower.

> 第二个原因是模型与程序实现及技术互相影响，而我无法直接获得这种反馈。例如，程序实现过程中发现模型的某部分在我们的技术平台上的工作效率极低，但是经过几个月的时间，我才一点一点获得了关于这个问题的全部信息。其实只需较少的改动就能解决这个问题，但是几个月过去了，改不改已经不重要了。因为开发人员已经自行编写出了可以运行的软件——完全脱离了模型的设计，在那些还在使用模型的地方，也仅仅是把它当作纯粹的数据结构。开发人员不分好坏地把模型全盘否定，但是他们又有什么办法呢？他们再也不愿意冒险任由呆在象牙塔里的架构师摆布了。

The initial circumstances of this project were about as favorable to a hands-off modeler as they ever are. I already had extensive hands-on experience with most of the technology used on the project. I had even led a small development team on the same project before my role changed, so I was familiar with the project’s development process and programming environment. Even those factors were not enough to make me effective, given the separation of modeler from implementation.

> 与其他项目一样，这个项目的初始环境倾向于不让建模人员参与太多的程序实现。对于该项目所使用的大部分技术，我都有着大量的实践经验。在做建模工作之前，我甚至曾经在同类项目中领导过一个小的开发团队，所以我对项目开发过程和编程环境非常熟悉。但是如果不让建模人员参与程序实现，我就是有这些经历也无法有效地工作。

If the people who write the code do not feel responsible for the model, or don’t understand how to make the model work for an application, then the model has nothing to do with the software. If developers don’t realize that changing code changes the model, then their refactoring will weaken the model rather than strengthen it. Meanwhile, when a modeler is separated from the implementation process, he or she never acquires, or quickly loses, a feel for the constraints of implementation. The basic constraint of MODEL-DRIVEN DESIGN—that the model supports an effective implementation and abstracts key domain knowledge—is half-gone, and the resulting models will be impractical. Finally, the knowledge and skills of experienced designers won’t be transferred to other developers if the division of labor prevents the kind of collaboration that conveys the subtleties of coding a MODEL-DRIVEN DESIGN.

> 如果编写代码的人员认为自己没必要对模型负责，或者不知道如何让模型为应用程序服务，那么这个模型就和程序没有任何关联。如果开发人员没有意识到改变代码就意味着改变模型，那么他们对程序的重构不但不会增强模型的作用，反而还会削弱它的效果。同样，如果建模人员不参与到程序实现的过程中，那么对程序实现的约束就没有切身的感受，即使有，也会很快忘记。MODEL-DRIVEN DESIGN 的两个基本要素（即模型要支持有效的实现并抽象出关键的领域知识）已经失去了一个，最终模型将变得不再实用。最后一点，如果分工阻断了设计人员与开发人员之间的协作，使他们无法转达实现 MODEL-DRIVEN DESIGN 的种种细节，那么经验丰富的设计人员则不能将自己的知识和技术传递给开发人员。

The need for HANDS-ON MODELERS does not mean that team members cannot have specialized roles. Every Agile process, including Extreme Programming, defines roles for team members, and other informal specializations tend to emerge naturally. The problem arises from separating two tasks that are coupled in a MODEL-DRIVEN DESIGN, modeling and implementation.

> HANDS-ON MODELER（亲身实践的建模者）并不意味着团队成员不能有自己的专业角色。包括极限编程在内的每一种敏捷过程都会给团队成员分配角色，其他非正式的专业角色也会自然而然地产生。但是如果把 MODEL-DRIVEN DESIGN 中密切相关的建模和实现这两个过程分离开，则会产生问题。

The effectiveness of an overall design is very sensitive to the quality and consistency of fine-grained design and implementation decisions. With a MODEL-DRIVEN DESIGN, a portion of the code is an expression of the model; changing that code changes the model. Programmers are modelers, whether anyone likes it or not. So it is better to set up the project so that the programmers do good modeling work.

> 整体设计的有效性有几个非常敏感的影响因素——那就是细粒度的设计和实现决策的质量和一致性。在 MODEL-DRIVEN DESIGN 中，代码是模型的表达，改变某段代码就改变了相应的模型。程序员就是建模人员，无论他们是否喜欢。所以在开始项目时，应该让程序员完成出色的建模工作。

Therefore:

> 因此：

Any technical person contributing to the model must spend some time touching the code, whatever primary role he or she plays on the project. Anyone responsible for changing code must learn to express a model through the code. Every developer must be involved in some level of discussion about the model and have contact with domain experts. Those who contribute in different ways must consciously engage those who touch the code in a dynamic exchange of model ideas through the UBIQUITOUS LANGUAGE.

> 任何参与建模的技术人员，不管在项目中的主要职责是什么，都必须花时间了解代码。任何负责修改代码的人员则必须学会用代码来表达模型。每一个开发人员都必须不同程度地参与模型讨论并且与领域专家保持联系。参与不同工作的人都必须有意识地通过 UBIQUITOUS LANGUAGE 与接触代码的人及时交换关于模型的想法。

---

The sharp separation of modeling and programming doesn’t work, yet large projects still need technical leaders who coordinate high-level design and modeling and help work out the most difficult or most critical decisions. Part IV, “Strategic Design,” deals with such decisions and should stimulate ideas for more productive ways to define the roles and responsibilities of high-level technical people.

> 将建模和编程过程完全分离是行不通的，然而大型项目依然需要技术负责人来协调高层次的设计和建模，并帮助做出最困难或最关键的决策。本书的第四部分描述的就是这种决策，通过学习该部分内容可以激发灵感，找到更高效的方法来定义高级技术人员的角色和职责。

Domain-driven design puts a model to work to solve problems for an application. Through knowledge crunching, a team distills a torrent of chaotic information into a practical model. A MODEL-DRIVEN DESIGN intimately connects the model and the implementation. The UBIQUITOUS LANGUAGE is the channel for all that information to flow between developers, domain experts, and the software.

> MODEL-DRIVEN DESIGN 利用模型来为应用程序解决问题。项目组通过知识消化将大量杂乱无章的信息提炼成实用的模型。而 MODEL-DRIVEN DESIGN 将模型和程序实现过程紧密结合。UBIQUITOUS LANGUAGE 则成为开发人员、领域专家和软件产品之间传递信息的渠道。

The result is software that provides rich functionality based on a fundamental understanding of the core domain.

> 最终的软件产品能够在完全理解核心领域的基础上提供丰富的功能。

As mentioned, success with MODEL-DRIVEN DESIGN is sensitive to detailed design decisions, which is the subject of the next several chapters.

> 如上所述，MODEL-DRIVEN DESIGN 的成功离不开详尽的设计决策。在下面几章中我们将会讲述这方面的内容。

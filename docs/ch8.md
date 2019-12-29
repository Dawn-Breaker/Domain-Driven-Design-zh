# 第 8 章 突破

> Eight. Breakthrough

Image
The returns from refactoring are not linear. Usually there is a marginal return for a small effort, and the small improvements add up. They fight entropy, and they are the frontline protection against a fossilized legacy. But some of the most important insights come abruptly and send a shock through the project.

Slowly but surely, the team assimilates knowledge and crunches it into a model. Deep models can emerge gradually through a sequence of small refactorings, an object at a time: a tweaked association here, a shifted responsibility there.

Often, though, continuous refactoring prepares the way for something less orderly. Each refinement of code and model gives developers a clearer view. This clarity creates the potential for a breakthrough of insights. A rush of change leads to a model that corresponds on a deeper level to the realities and priorities of the users. Versatility and explanatory power suddenly increase even as complexity evaporates.

This sort of breakthrough is not a technique; it is an event. The challenge lies in recognizing what is happening and deciding how to deal with it. To convey what this experience feels like, I’ll tell a true story of a project I worked on some years ago, and how we arrived at a very valuable deep model.

STORY OF A BREAKTHROUGH
After a long New York winter of refactoring, we had arrived at a model that captured some of the key knowledge of the domain and a design that did some real work for the application. We were developing a core part of a large application for managing syndicated loans in an investment bank.

When Intel wants to build a billion-dollar factory, they need a loan that is too big for any single lending company to take on, so the lenders form a syndicate that pools its resources to support a facility (see sidebar). An investment bank usually acts as syndicate leader, coordinating transactions and other services. Our project was to build software to track and support this whole process.

A Decent Model, and Yet . . .
We were feeling pretty good. Four months before, we had been in deep trouble with a completely unworkable, inherited code base, which we had since wrestled into a coherent MODEL-DRIVEN DESIGN.

The model reflected in Figure 8.1 makes the common case very simple. The Loan Investment is a derived object that represents a particular investor’s contribution to the Loan, proportional to its share in the Facility.

Image
Figure 8.1. A model that assumes lender shares are fixed

What Is a “Facility”?

A “facility” in this context is not a building. As on most projects, specialized terminology from the domain experts entered our vocabulary and became part of the UBIQUITOUS LANGUAGE. In the domain of commercial banking, a facility is a commitment by a company to lend. Your credit card is a facility that entitles you to borrow on demand up to a prearranged limit at a predetermined interest rate. When you use the card, you create an outstanding loan, and each additional charge is a drawdown against your facility that increases the loan. Finally you pay back the loan principal. You may also pay an annual fee. This is a fee for the privilege of having the card (the facility) and is independent of your loan.

But there were some disconcerting signs. We kept stumbling over unexpected requirements that complicated the design. A major example was the creeping understanding that the shares in a Facility were only a guideline to participation in any particular loan draw-down. When the borrower requests its money, the leader of the syndicate calls all members for their shares.

When called, the investors usually cough up their share, but often they negotiate with other members of the syndicate and invest less (or more). We had accommodated this by adding Loan Adjustments to the model.

Image
Figure 8.2. A model incrementally changed to solve problems. Loan Adjustments track departures from the share a lender originally agreed to in the Facility.

Refinements of this kind allowed us to keep up as the rules of various transactions became clearer. But complexity was increasing, and we did not seem to be converging quickly onto really solid functionality.

Even more troubling were subtle rounding inconsistencies that we had not been able to squash with increasingly complex algorithms. True, in a $100 million (MM) deal, no one cares about where the extra pennies go, but bankers don’t trust software that cannot meticulously account for those pennies. We began to suspect that our difficulties were symptomatic of a basic design problem.

The Breakthrough
Suddenly one week it dawned on us what was wrong. Our model tied together the Facility and Loan shares in a way that was not appropriate to the business. This revelation had wide repercussions. With the business experts nodding, enthusiastically helping—and, I dare say, wondering what took us so long—we hashed out a new model on a whiteboard. Although the details hadn’t jelled yet, we knew the crucial feature of the new model: shares of the Loan and those of the Facility could change independently of each other. With that insight, we walked through numerous scenarios using a visualization of the new model that looked something like this:

Image
Figure 8.3. A drawdown distributed based on Facility shares

This diagram says that the borrower has chosen to draw an initial $50MM from the $100MM committed under the Facility. The three lenders chip in their shares in exact proportion to the Facility shares, resulting in a $50MM Loan divided among the lenders.

Then, in Figure 8.4, the borrower draws an additional $30MM, bringing his outstanding Loan to $80MM, still under the $100MM limit of the Facility. This time, Company B chooses not to participate, letting Company A take an extra share. The shares of the draw-down reflect these investment choices. When the drawdown amounts are added to the Loan, the shares of the Loan are no longer proportional to the shares of the Facility. This is common.

Image
Figure 8.4. Lender B opts out of a second drawdown.

Image
Figure 8.5. Principal payments are always distributed proportional to shares in the outstanding Loan.

When the borrower pays down the Loan, the money is divided among the lenders according to the shares of the Loan, not the Facility. Likewise, interest payments will be divided according to the Loan shares.

Image
Figure 8.6. Fee payments are always distributed proportionally to shares in the Facility.

On the other hand, when the borrower pays a fee for the privilege of having the Facility available, this money is divided according to the Facility shares, regardless of who actually has lent money. The Loan is unchanged by fee payments. There are even scenarios in which lenders trade shares of fees separately from their shares of interest, and so on.

A Deeper Model
We had two deep insights. First was the realization that our “Investments” and “Loan Investments” were just two special cases of a general and fundamental concept: shares. Shares of a facility, shares of a loan, shares of a payment distribution. Shares, shares everywhere. Shares of any divisible value.

A few tumultuous days later I had sketched a model of shares, drawing on the language used in the discussions with experts and the scenarios we had explored together.

Image
Figure 8.7. An abstract model of shares

I also sketched a new loan model to go with it.

Image
Figure 8.8. The Loan model using Share Pie

There were no longer specialized objects for the shares of a Facility or a Loan. They both were broken down into the more intuitive “Share Pie.” This generalization allowed the introduction of “shares math,” vastly simplifying the calculation of shares in any transaction, and making those calculations more expressive, concise, and easily combined.

But most of all, problems went away because the new model removed an inappropriate constraint. It freed the Loan’s Shares to depart from the proportions of the Facility’s Shares, while keeping in place the valid constraints on totals, fee distributions, and so on. The Share Pie of the Loan could be adjusted directly, so the Loan Adjustment was no longer needed, and a large amount of special-case logic was eliminated.

The Loan Investment had disappeared, and at this point we realized that “loan investment” was not a banking term. In fact, the business experts had told us a number of times that they didn’t understand it. They had deferred to our software knowledge and assumed it was useful to the technical design. Actually, we had created it based on our incomplete understanding of the domain.

Suddenly, on the basis of this new way of looking at the domain, we could run through every scenario we had ever encountered relatively effortlessly, much more simply than ever before. And our model diagrams made perfect sense to the business experts, who had often indicated that the diagrams were “too technical” for them. Even just sketching on a whiteboard, we could see that our most persistent rounding problems would be pulled out by the roots, allowing us to scrap some of the complicated rounding code.

Our new model worked well. Really, really well.

And we all felt sick!

A Sobering Decision
You might reasonably assume that we would have been elated at this point. We were not. We were under a severe deadline; the project was already dangerously behind schedule. Our dominant emotion was fear.

The gospel of refactoring is that you always go in small steps, always keeping everything working. But to refactor our code to this new model would require changing a lot of supporting code, and there would be few, if any, stable stopping points in between. We could see some small improvements we could make, but none that would take us closer to the new concept. We could see a sequence of small steps to get there, but parts of the application would be disabled along the way. And this was before the age when automated tests were widely used on such projects. We had none, so there was bound to be unforeseen breakage.

And it was going to take effort. We were already exhausted from months of pushing.

At this point, we had a meeting with our project manager that I will never forget. Our manager was an intelligent and bold man. He asked a series of questions:

Q: How long would it take to get back to current functionality with the new design?

A: About three weeks.

Q: Could we solve the problems without it?

A: Probably. But no way to be sure.

Q: Would we be able to move forward in the next release if we didn’t do it now?

A: Forward movement would be slow without the change. And the change would be much harder once we had an installed base.

Q: Did we think it was the right thing to do?

A: We knew the political situation was unstable, so we’d cope if we had to. And we were tired. But, yes, it was a simpler solution that fit the business much better. In the long run it was lower risk.

He gave us the go-ahead and told us he would handle the heat. I’ve always had tremendous admiration for the courage and trust it took for him to make that decision.

We busted our butts and got it done in three weeks. It was a big job, but it went surprisingly smoothly.

The Payoff
The mystifyingly unexpected requirement changes stopped. The rounding logic, though never exactly simple, stabilized and made sense. We delivered version one and the way was clear to version two. My nervous breakdown was narrowly averted.

As version two evolved, this Share Pie became the unifying theme of the whole application. Technical people and business experts used it to discuss the system. Marketing people used it to explain the features to prospective customers. Those prospects and customers immediately grasped it and used it to discuss features. It truly became part of the UBIQUITOUS LANGUAGE because it got to the heart of what loan syndication is about.

OPPORTUNITIES
When the prospect of a breakthrough to a deeper model presents itself, it is often scary. Such a change has higher opportunity and higher risk than most refactorings. And timing may be inopportune.

Much as we might like it to be otherwise, progress isn’t a smooth ride. The transition to a really deep model is a profound shift in your thinking and demands a major change to the design. On many projects the most important progress in model and design come in these breakthroughs.

FOCUS ON BASICS
Don’t become paralyzed trying to bring about a breakthrough. The possibility usually comes after many modest refactorings. Most of the time is spent making piecemeal improvements, with model insights emerging gradually during each successive refinement.

To set the stage for a breakthrough, concentrate on knowledge crunching and cultivating a robust UBIQUITOUS LANGUAGE. Probe for important domain concepts and make them explicit in the model (as discussed in Chapter 9). Refine the design to be suppler (see Chapter 10). Distill the model (see Chapter 15). Push on these more predictable levers, which increase clarity—usually a precursor of breakthroughs.

Don’t hold back from modest improvements, which gradually deepen the model, even if confined within the same general conceptual framework. Don’t be paralyzed by looking too far forward. Just be watchful for the opportunity.

EPILOGUE: A CASCADE OF NEW INSIGHTS
That breakthrough got us out of the woods, but it was not the end of the story. The deeper model opened unexpected opportunities to make the application richer and the design clearer.

Just weeks after the release of the Share Pie version of the software, we noticed another awkward aspect of the model that was complicating the design. An important ENTITY was missing, its absence leaving extra responsibilities to be taken up by other objects. Specifically, there were significant rules governing loan drawdowns, fee payments, and so on, and all this logic was crammed into various methods on the Facility and Loan. These design problems, which had been barely noticeable before the Share Pie breakthrough, became obvious with our clearer field of vision. Now we noticed terms popping up in our discussions that were nowhere to be found in the model—terms such as “transaction” (meaning a financial transaction)—that we started to realize were being implied by all those complicated methods.

Following a process similar to the one described earlier (although, thankfully, under much less time pressure) led to yet another round of insights and a still deeper model. This new model made those implicit concepts explicit, as kinds of Transactions, and at the same time simplified the Positions (an abstraction including the Facility and Loan). It became easy to define the diverse transactions we had, along with their rules, negotiating procedures, and approval processes, and all in relatively self-explanatory code.

Image
Figure 8.9. Another model breakthrough that followed several weeks later. Constraints on Transactions could be expressed with easy precision.

As is often the case after a real breakthrough to a deep model, the clarity and simplicity of the new design, combined with the enhanced communication based on the new UBIQUITOUS LANGUAGE, had led to yet another modeling breakthrough.

Our pace of development was accelerating at a stage where most projects are beginning to bog down in the mass and complexity of what has already been built.
using Domain;
using FluentValidation;

namespace Application.Scenarios
{
  public class ScenarioValidator : AbstractValidator<Scenario>
  {
    public ScenarioValidator()
    {
      RuleFor(x => x.Title).NotEmpty();
      RuleFor(x => x.Description).NotEmpty();
      RuleFor(x => x.BPCycle).NotEmpty();
      RuleFor(x => x.Category).NotEmpty();
      RuleFor(x => x.DueDate).NotEmpty();
      RuleFor(x => x.File).NotEmpty();
    }
  }
}
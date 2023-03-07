using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Scenarios
{
  public class Create
  {
    public class Command : IRequest
    {
      public Scenario Scenario { get; set; }
    }
    public class CommandValidator : AbstractValidator<Command>
    {
      public CommandValidator()
      {
        RuleFor(x => x.Scenario).SetValidator(new ScenarioValidator());
      }
    }
    public class Handler : IRequestHandler<Command>
    {
      private readonly DataContext _context;
      public Handler(DataContext context)
      {
        _context = context;
      }
      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        _context.Scenarios.Add(request.Scenario);
        await _context.SaveChangesAsync();
        return Unit.Value;
      }
    }
  }
}
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Scenarios
{
  public class Create
  {
    public class Command : IRequest<Result<Unit>>
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
    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private readonly DataContext _context;
      public Handler(DataContext context)
      {
        _context = context;
      }
      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        _context.Scenarios.Add(request.Scenario);
        await _context.SaveChangesAsync();
        return Result<Unit>.Success(Unit.Value);
      }
    }
  }
}
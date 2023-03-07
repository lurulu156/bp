using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Scenarios
{
  public class Edit
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
      private readonly IMapper _mapper;
      public Handler(DataContext context, IMapper mapper)
      {
        _mapper = mapper;
        _context = context;
      }
      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        var scenario = await _context.Scenarios.FindAsync(request.Scenario.Id);
        if (scenario == null) return null;
        _mapper.Map(request.Scenario, scenario);
        var result = await _context.SaveChangesAsync() > 0;
        if (!result) return Result<Unit>.Failure("Failed to edit the scenario");
        return Result<Unit>.Success(Unit.Value);
      }
    }
  }
}
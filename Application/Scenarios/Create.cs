using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
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
      private readonly IUserAccessor _userAccessor;
      public Handler(DataContext context, IUserAccessor userAccessor)
      {
        _userAccessor = userAccessor;
        _context = context;
      }
      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

        var attendee = new ScenarioAttendee
        {
          AppUser = user,
          Scenario = request.Scenario,
          isHost = true
        };

        request.Scenario.Attendees.Add(attendee);

        _context.Scenarios.Add(request.Scenario);
        await _context.SaveChangesAsync();
        return Result<Unit>.Success(Unit.Value);
      }
    }
  }
}
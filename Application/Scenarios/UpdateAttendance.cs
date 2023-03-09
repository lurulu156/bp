using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Scenarios
{
  public class UpdateAttendance
  {
    public class Command : IRequest<Result<Unit>>
    {
      public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private readonly IUserAccessor _userAccessor;
      private readonly DataContext _context;
      public Handler(DataContext context, IUserAccessor userAccessor)
      {
        _context = context;
        _userAccessor = userAccessor;

      }
      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        var scenario = await _context.Scenarios
           .Include(a => a.Attendees)
           .ThenInclude(u => u.AppUser)
           .SingleOrDefaultAsync(x => x.Id == request.Id);
        if (scenario == null) return null;

        var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
        if (user == null) return null;

        var hostUsername = scenario.Attendees.FirstOrDefault(x => x.isHost)?.AppUser.UserName;
        var attendance = scenario.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

        //user is host: toggle cancell scenario
        if (attendance != null && hostUsername == user.UserName)
          scenario.IsCancelled = !scenario.IsCancelled;

        //user is not host: not attend scenario
        if (attendance != null && hostUsername != user.UserName)
          scenario.Attendees.Remove(attendance);

        //user is not host: attend scenario 
        if (attendance == null)
        {
          attendance = new ScenarioAttendee
          {
            AppUser = user,
            Scenario = scenario,
            isHost = false
          };
          scenario.Attendees.Add(attendance);
        }

        var result = await _context.SaveChangesAsync() > 0;
        return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating attendance");
      }
    }
  }
}
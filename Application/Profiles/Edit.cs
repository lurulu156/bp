using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
  public class Edit
  {
    public class Command : IRequest<Result<Unit>>
    {
      public Profile Profile { get; set; }
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

        user.Bio = request.Profile.Bio ?? user.Bio;
        user.DisplayName = request.Profile.DisplayName ?? user.DisplayName;
        user.Department = request.Profile.Department ?? user.Department;
        user.Title = request.Profile.Title ?? user.Title;

        _context.Entry(user).State = EntityState.Modified;

        var result = await _context.SaveChangesAsync() > 0;
        if (result) return Result<Unit>.Success(Unit.Value);
        return Result<Unit>.Failure("Problem updating profile");

      }
    }
  }
}
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using FluentValidation;
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
    public class CommandValidator : AbstractValidator<Command>
    {
      public CommandValidator()
      {
        RuleFor(x => x.Profile).SetValidator(new ProfileValidator());
      }
    }
    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private readonly DataContext _context;
      private readonly IUserAccessor _userAccessor;
      private readonly IMapper _mapper;
      public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
      {
        _mapper = mapper;
        _userAccessor = userAccessor;
        _context = context;
      }
      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
        if (user == null) return null;

        _mapper.Map(request.Profile, user);

        _context.Entry(user).State = EntityState.Modified;

        var result = await _context.SaveChangesAsync() > 0;
        if (result) return Result<Unit>.Success(Unit.Value);
        return Result<Unit>.Failure("Problem updating profile");

      }
    }
  }
}
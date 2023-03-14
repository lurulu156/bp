using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
  public class Create
  {
    public class Command : IRequest<Result<CommentDto>>
    {
      public string Category { get; set; }
      public string Body { get; set; }
      public Guid ScenarioId { get; set; }
    }
    public class Handler : IRequestHandler<Command, Result<CommentDto>>
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
      public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
      {
        var scenario = await _context.Scenarios
            .Include(x => x.Comments)
            .ThenInclude(x => x.Author)
            .ThenInclude(x => x.Photos)
            .FirstOrDefaultAsync(x => x.Id == request.ScenarioId);

        if (scenario == null) return null;

        var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

        var comment = new Comment
        {
          Author = user,
          Scenario = scenario,
          Body = request.Body,
          Category = request.Category
        };
        scenario.Comments.Add(comment);

        var result = await _context.SaveChangesAsync() > 0;
        if (result) return Result<CommentDto>.Success(_mapper.Map<CommentDto>(comment));
        return Result<CommentDto>.Failure("Failed to add comment");
      }
    }
  }
}
using FluentValidation;

namespace Application.Profiles
{
  public class ProfileValidator : AbstractValidator<Profile>
  {
    public ProfileValidator()
    {
      RuleFor(x => x.Title).NotEmpty();
      RuleFor(x => x.DisplayName).NotEmpty();
      RuleFor(x => x.Department).NotEmpty();
    }
  }
}
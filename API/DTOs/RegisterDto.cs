using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
  public class RegisterDto
  {
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    [RegularExpression("(?=.*//d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must include at least 1 upper case, 1 lower case and numeric")]
    public string Password { get; set; }
    [Required]
    public string DisplayName { get; set; }
    [Required]
    public string Username { get; set; }
    [Required]
    public string Department { get; set; }
    [Required]
    public string Title { get; set; }
  }
}
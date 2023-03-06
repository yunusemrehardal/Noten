using System.ComponentModel.DataAnnotations;

namespace NotenApi.Data
{
    public class Note
    {
        public int Id { get; set; }

        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        public string? Content { get; set; }
    }
}
